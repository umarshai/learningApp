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
  editIndex: string|null = null;
  form: Expense = { amount: 0, description: '', date: '', tags: [], category: '' };
  newTag = '';
  newCategory = '';
  showTagModal = false;
  showCategoryModal = false;
  selectedTag = '';
  selectedTagForDelete = '';
  selectedCategoryForDelete = '';

  constructor(private expenseService: ExpenseService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.expenseService.getAll().subscribe((data: any) => {
      this.expenses = [];
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key].type === 'expense') {
            this.expenses.push({ ...data[key], id: key });
          }
        });
      }
    });
    this.expenseService.getTags().subscribe((data: any) => {
      this.tags = [];
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key].type === 'tag') {
            this.tags.push(data[key].value);
          }
        });
      }
    });
    this.expenseService.getCategories().subscribe((data: any) => {
      this.categories = [];
      if (data) {
        Object.keys(data).forEach(key => {
          if (data[key].type === 'category') {
            this.categories.push(data[key].value);
          }
        });
      }
    });
  }

  save() {
    if (this.editIndex !== null) {
      this.expenseService.update(this.editIndex, this.form).subscribe(() => {
        this.cancel();
        this.load();
      });
    } else {
      this.expenseService.add(this.form).subscribe(() => {
        this.cancel();
        this.load();
      });
    }
  }

  edit(i: number) {
    const expense = this.expenses[i];
    this.editIndex = expense.id || null;
    this.form = { ...expense, tags: [...(expense.tags || [])] };
    this.showForm = true;
  }

  delete(i: number) {
    const expense = this.expenses[i];
    if (expense.id) {
      this.expenseService.delete(expense.id).subscribe(() => {
        this.load();
      });
    }
  }

  addTag() {
    if (this.newTag.trim()) {
      this.expenseService.addTag(this.newTag.trim()).subscribe(() => {
        this.newTag = '';
        this.load();
        this.closeTagModal();
      });
    }
  }

  addCategory() {
    if (this.newCategory.trim()) {
      this.expenseService.addCategory(this.newCategory.trim()).subscribe(() => {
        this.newCategory = '';
        this.load();
        this.closeCategoryModal();
      });
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
    // Find the Firebase key for this tag
    this.expenseService.getTags().subscribe((data: any) => {
      if (data) {
        const key = Object.keys(data).find(k => data[k].type === 'tag' && data[k].value === tag);
        if (key) {
          this.expenseService.deleteTag(key).subscribe(() => this.load());
        }
      }
    });
  }

  deleteCategory(category: string): void {
    this.expenseService.getCategories().subscribe((data: any) => {
      if (data) {
        const key = Object.keys(data).find(k => data[k].type === 'category' && data[k].value === category);
        if (key) {
          this.expenseService.deleteCategory(key).subscribe(() => this.load());
        }
      }
    });
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
