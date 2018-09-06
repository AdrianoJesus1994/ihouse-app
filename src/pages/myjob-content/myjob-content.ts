import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { Job } from '../../interfaces/job';

@IonicPage()
@Component({
  selector: 'page-myjob-content',
  templateUrl: 'myjob-content.html',
})
export class MyJobContentPage {
  job: Job;

  constructor(navParams: NavParams) {
    this.job = navParams.data.job;
  }
}
