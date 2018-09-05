import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Job } from '../../interfaces/job';

@IonicPage()
@Component({
  selector: 'page-job-payment',
  templateUrl: 'job-payment.html',
})
export class JobPaymentPage {
  name: string;
  employerID: number;
  job: Job;

  constructor(private navCtrl: NavController, navParams: NavParams, auth: AuthProvider) {
    auth.getUser().subscribe((val) => {
      this.name = val.displayName;
      this.job = navParams.data.job;
      this.employerID = navParams.data.id;
    });
  }

  ionViewDidLoad(): void {
    console.log(this.job);
  }

}
