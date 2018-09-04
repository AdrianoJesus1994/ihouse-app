import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from '../../interfaces/category';
import { Observable } from 'rxjs';

@Injectable()
export class DatabaseProvider {
  constructor(private db: AngularFireDatabase) { }

  getListCategoreServices<T>(): Observable<T[]> {
    return this.db.list<T>("cat_jobs").valueChanges();
  }
}
