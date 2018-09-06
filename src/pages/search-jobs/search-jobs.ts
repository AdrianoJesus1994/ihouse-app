import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, Segment } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Category } from './../../interfaces/category';
import { Job } from './../../interfaces/job';
import { Dialog } from './../../providers/dialog/dialog';

@IonicPage()
@Component({
  selector: 'page-search-jobs',
  templateUrl: 'search-jobs.html',
})
export class SearchJobsPage {
  @ViewChild(Segment) segment: Segment;
  jobs: Job[] = [];
  categories: Category[] = [];
  category: Category;

  constructor(public navCtrl: NavController, private dialog: Dialog, private database: DatabaseProvider) { }

  ionViewDidLoad(): void {
    this.fetchCategories();
  }

  fetchCategories(): void {
    this.database.getCategories<Category>().subscribe((categories) => {
      this.categories = categories;
      this.segment.ngAfterContentInit();
    }, (err) => this.dialog.presentAlert(err.message));
  }

  fetchAllJobs(): void {
    this.database.getJobs<Job>().subscribe((jobs) => {
      this.dialog.hideLoading();
      this.jobs = jobs;
    }, (err) => this.dialog.presentAlert(err.message));
  }

  onCategoryChange(): void {
    console.log(this.category);
  }

  onSelectCategory(job: Job): void {
    this.navCtrl.push('SearchContentPage', { job: job });
  }

}