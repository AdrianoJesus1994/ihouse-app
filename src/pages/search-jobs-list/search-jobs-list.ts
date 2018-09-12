import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';

import { Dialog } from '../../providers/dialog/dialog';
import { DatabaseProvider } from '../../providers/database/database';
import { Category } from '../../interfaces/category';
import { Job } from '../../interfaces/job';

@IonicPage()
@Component({
  selector: 'page-search-jobs-list',
  templateUrl: 'search-jobs-list.html',
})
export class SearchJobsListPage {
  jobs: Job[] = [];
  category: Category;

  constructor(navParams: NavParams, private dialog: Dialog, private database: DatabaseProvider) {
    this.category = navParams.data;
    this.fetchJobs();
  }
  private fetchJobs(): void {
    this.database.getJobsByCategory<Job>(this.category.id).subscribe((jobs) => {
      this.jobs = jobs;
    });
  }
}
