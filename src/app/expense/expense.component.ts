import { Component, OnInit } from '@angular/core';
import { ExpenseService, Expense } from './expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[] = [];
  tags: string[] = [];
  categories: string[] = [];
  filterTag = '';
  filterCategory = '';
  filterDateType = 'all';
  filterCustomStart = '';
  filterCustomEnd = '';
  showForm = false;
  editIndex: number|null = null;
  form: Expense = { amount: 0, description: '', date: '', tags: [], category: '' };
  newTag = '';
  newCategory = '';
  showTagModal = false;
  showCategoryModal = false;
  selectedTag = '';

  constructor(private expenseService: ExpenseService) {}



  ngOnInit() {
    this.load();
  }

  load() {
    this.expenses = this.expenseService.getAll();
    this.tags = this.expenseService.getTags();
    this.categories = this.expenseService.getCategories();
  }

  save() {
    if (this.editIndex !== null) {
      this.expenseService.update(this.editIndex, this.form);
    } else {
      this.expenseService.add(this.form);
    }
    this.cancel();
    this.load();
  }

  edit(i: number) {
    this.editIndex = i;
    // Deep copy tags array to avoid mutating the original
    this.form = { ...this.expenses[i], tags: [...(this.expenses[i].tags || [])] };
    this.showForm = true;
  }

  delete(i: number) {
    this.expenseService.delete(i);
    this.load();
  }

  addTag() {
    if (this.newTag.trim()) {
      this.expenseService.addTag(this.newTag.trim());
      this.newTag = '';
      this.load();
      this.closeTagModal();
    }
  }

  addCategory() {
    if (this.newCategory.trim()) {
      this.expenseService.addCategory(this.newCategory.trim());
      this.newCategory = '';
      this.load();
      this.closeCategoryModal();
    }
  }

  startAdd() {
    this.editIndex = null;
    const today = new Date().toISOString().slice(0, 10);
    this.form = {
      amount: 0,
      description: '',
      date: today,
      tags: [],
      category: ''
    };
    this.showForm = true;
  }

  cancel() {
    this.showForm = false;
    this.editIndex = null;
  this.form = { amount: 0, description: '', date: '', tags: [], category: '' };
  }

  openTagModal() {
    this.showTagModal = true;
  }
  closeTagModal() {
    this.showTagModal = false;
    this.newTag = '';
  }
  openCategoryModal() {
    this.showCategoryModal = true;
  }
  closeCategoryModal() {
    this.showCategoryModal = false;
    this.newCategory = '';
  }

  deleteTag(tag: string): void {
    if (tag && tag.trim().length > 0) {
      this.expenseService.deleteTag(tag);
      this.load();
    }
  }

  deleteCategory(category: string): void {
    if (category && category.trim().length > 0) {
      this.expenseService.deleteCategory(category);
      this.load();
    }
  }

  addTagToExpense() {
    if (this.selectedTag && !this.form.tags.includes(this.selectedTag)) {
      this.form.tags.push(this.selectedTag);
      this.selectedTag = '';
    }
  }

  removeTagFromExpense(index: number) {
    this.form.tags.splice(index, 1);
  }

  get filteredExpenses() {
    let filtered = this.expenses;
    if (this.filterTag)
      filtered = filtered.filter(e => Array.isArray(e.tags) && e.tags.includes(this.filterTag));
    if (this.filterCategory)
      filtered = filtered.filter(e => e.category === this.filterCategory);
    if (this.filterDateType !== 'all') {
      const now = new Date();
      let start: Date, end: Date;
      if (this.filterDateType === 'daily') {
        start = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        end = new Date(start); end.setDate(end.getDate() + 1);
      } else if (this.filterDateType === 'weekly') {
        start = new Date(now);
        start.setDate(now.getDate() - now.getDay());
        end = new Date(start); end.setDate(end.getDate() + 7);
      } else if (this.filterDateType === 'monthly') {
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date(now.getFullYear(), now.getMonth() + 1, 1);
      } else if (this.filterDateType === 'custom' && this.filterCustomStart && this.filterCustomEnd) {
        start = new Date(this.filterCustomStart);
        end = new Date(this.filterCustomEnd);
        end.setDate(end.getDate() + 1);
      } else {
        return filtered;
      }
      filtered = filtered.filter(e => {
        const d = new Date(e.date);
        return d >= start && d < end;
      });
    }
    return filtered;
  }

  get total() {
    return this.filteredExpenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }
}
