import { AuthProvider } from './../../providers/auth/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Dialog } from '../../providers/dialog/dialog';
import { Job } from '../../interfaces/job';


@IonicPage()
@Component({
  selector: 'page-myjobs',
  templateUrl: 'myjobs.html',
})
export class MyjobsPage {
  myJobs: Job[] = [];

  constructor(
    private navCtrl: NavController,
    private dialog: Dialog,
    private auth: AuthProvider,
    private database: DatabaseProvider
  ) { }

  ionViewDidLoad(): void {
    this.dialog.showLoading();
    this.auth.getUser().subscribe((user) => {
      this.database.getJobsByEmployer<Job>(user.uid).subscribe((jobs) => {
        this.dialog.hideLoading();
        this.myJobs = jobs;
      }, (err) => {
        this.dialog.presentAlert(err.message);
      });
    });
  }

  onVerDetalhes(job: Job): void {
    this.navCtrl.push('MyJobDetalhePage', { job: job });
  }
}
