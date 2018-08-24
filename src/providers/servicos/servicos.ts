import { Job } from './../../interfaces/job';
import { Category } from './../../interfaces/category';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ServicosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicosProvider {

  constructor(private http: HttpClient, private db: AngularFireDatabase) {
    console.log('Hello ServicosProvider Provider');
  }

  getListServices(): Promise<Job[]> {
    return this.db.list<Job>("/jobs").valueChanges().toPromise();
  }

  getListMyJobs(): Promise<Job[]> {
    return this.db.list<Job>("/cat_jobs").valueChanges().toPromise();
  }

  getListCategoreServices(): Promise<Category[]> {
    return this.db.list<Category>("/cat_jobs").valueChanges().toPromise();
  }

}
