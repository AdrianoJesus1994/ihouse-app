import { Job } from './../../interfaces/job';
import { Category } from './../../interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from '../../../node_modules/rxjs';

@Injectable()
export class ServicosProvider {

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    console.log('Hello ServicosProvider Provider');
  }

  getListServices(): Observable<Job[]> {
    return this.db.list<Job>("/jobs").valueChanges();
  }

  getListMyJobs(): Observable<Job[]> {
    return this.db.list<Job>("/cat_jobs").valueChanges();
  }

  getListCategoreServices(): Observable<Category[]> {
    return this.db.list<Category>("/cat_jobs").valueChanges();
  }

}
