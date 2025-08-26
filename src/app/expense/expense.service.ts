import { Injectable } from '@angular/core';

export interface Expense {
  amount: number;
  description: string;
  date: string;
  tags: string[];
  category: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  private key = 'expenses';
  private tagKey = 'expenseTags';
  private categoryKey = 'expenseCategories';

  getAll(): Expense[] {
    return JSON.parse(localStorage.getItem(this.key) || '[]');
  }


  add(expense: Expense) {
    const expenses = this.getAll();
    // Ensure tags is always an array
    if (!Array.isArray(expense.tags)) {
      expense.tags = expense.tags ? [expense.tags] : [];
    }
    expenses.push(expense);
    localStorage.setItem(this.key, JSON.stringify(expenses));
  }


  update(index: number, expense: Expense) {
    const expenses = this.getAll();
    if (!Array.isArray(expense.tags)) {
      expense.tags = expense.tags ? [expense.tags] : [];
    }
    expenses[index] = expense;
    localStorage.setItem(this.key, JSON.stringify(expenses));
  }

  deleteTag(tag: string): void {
    const tags: string[] = this.getTags() || [];
    const updatedTags: string[] = tags.filter((t: string) => t !== tag);
    localStorage.setItem(this.tagKey, JSON.stringify(updatedTags));
  }

  deleteCategory(category: string): void {
    const categories: string[] = this.getCategories() || [];
    const updatedCategories: string[] = categories.filter((c: string) => c !== category);
    localStorage.setItem(this.categoryKey, JSON.stringify(updatedCategories));
  }

  delete(index: number) {
    const expenses = this.getAll();
    expenses.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(expenses));
  }

  getTags(): string[] {
    return JSON.parse(localStorage.getItem(this.tagKey) || '["food","family","personal","credit card","snacks","avoidable expense"]');
  }

  addTag(tag: string) {
    const tags = this.getTags();
    if (!tags.includes(tag)) {
      tags.push(tag);
      localStorage.setItem(this.tagKey, JSON.stringify(tags));
    }
  }

  getCategories(): string[] {
    // Add some known categories if none exist
    const defaultCategories = ["Food", "Transport", "Shopping", "Bills", "Health", "Entertainment", "Family", "Personal", "Credit Card", "Snacks", "Avoidable Expense"];
    const stored = JSON.parse(localStorage.getItem(this.categoryKey) || 'null');
    if (!stored || !Array.isArray(stored) || stored.length === 0) {
      localStorage.setItem(this.categoryKey, JSON.stringify(defaultCategories));
      return defaultCategories;
    }
    return stored;
  }

  addCategory(category: string) {
    const categories = this.getCategories();
    if (!categories.includes(category)) {
      categories.push(category);
      localStorage.setItem(this.categoryKey, JSON.stringify(categories));
    }
  }
}
