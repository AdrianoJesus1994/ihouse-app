import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Injectable()
export class DatabaseProvider {
  constructor(private db: AngularFireDatabase) { }

  getCategories<T>(): Observable<T[]> {
    return this.db.list<T>("cat_jobs").valueChanges();
  }
  getMessages<T>(): Observable<T[]> {
    return this.db.list<T>("messages").valueChanges();
  }
  createUser<T>(path: string, user: T): void {
    this.db.object<T>(path).set(user);
  }

  // Employee

  getEmployees<T>(): Observable<T[]> {
    return this.db.list<T>("employee").valueChanges();
  }
  getEmployeeByID<T>(id: string): Observable<T> {
    return this.db.object<T>(`employee/${id}`).valueChanges();
  }

  // Employer

  getEmployers<T>(): Observable<T[]> {
    return this.db.list<T>("employer").valueChanges();
  }
  getEmployerByID<T>(id: string): Observable<T> {
    return this.db.object<T>(`employer/${id}`).valueChanges();
  }
}
