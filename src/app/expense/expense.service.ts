import { Injectable } from '@angular/core';
import { DbService } from '../service/db.service';
import { Observable } from 'rxjs';

export interface Expense {
  amount: number;
  description: string;
  date: string;
  tags: string[];
  category: string;
  id?: string;
}

@Injectable({ providedIn: 'root' })
export class ExpenseService {
  constructor(private db: DbService) {}

  // Expenses CRUD
  getAll(): Observable<any> {
    return this.db.getData(); // filter in component for type: 'expense'
  }

  add(expense: Expense): Observable<any> {
    return this.db.addNew({ ...expense, type: 'expense' });
  }

  update(id: string, expense: Expense): Observable<any> {
    return this.db.updateData(id, { ...expense, type: 'expense' });
  }

  delete(id: string): Observable<any> {
    return this.db.deleteData(id);
  }

  // Tags CRUD
  getTags(): Observable<any> {
    return this.db.getData(); // filter in component for type: 'tag'
  }

  addTag(tag: string): Observable<any> {
    return this.db.addNew({ value: tag, type: 'tag' });
  }

  deleteTag(id: string): Observable<any> {
    return this.db.deleteData(id);
  }

  // Categories CRUD
  getCategories(): Observable<any> {
    return this.db.getData(); // filter in component for type: 'category'
  }

  addCategory(category: string): Observable<any> {
    return this.db.addNew({ value: category, type: 'category' });
  }

  deleteCategory(id: string): Observable<any> {
    return this.db.deleteData(id);
  }
}
