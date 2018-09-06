import { Job } from './../../interfaces/job';
import { Dialog } from './../../providers/dialog/dialog';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-search-jobs-cat',
  templateUrl: 'search-jobs-cat.html',
})
export class SearchJobsCatPage {
  jobs: Job[] = [];

  constructor(public navCtrl: NavController, private dialog: Dialog, private database: DatabaseProvider) { }


  ionViewDidLoad() {
    this.database.getJobs<Job>().subscribe((jobs) => {
      this.dialog.hideLoading();
      this.jobs = jobs;
    }, (err) => {
      this.dialog.presentAlert(err.message);
    });
  }

  onSelectCategory(cat: any) {
    this.navCtrl.push('ListJobsPage', { data: cat });
  }

}
