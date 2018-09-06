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

  ionViewDidLoad() {
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

  onVerDetalhes(service: any) {
    console.log(service);
    this.navCtrl.push('MyJobDetalhePage', { job: service });
  }

  _onLoadListServices() {
    // TODO
  }

}
