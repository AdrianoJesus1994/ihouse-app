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
  myJobs: Job[];

  constructor(private navCtrl: NavController, private dialog: Dialog, private database: DatabaseProvider) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyjobsPage');
    this._onLoadListServices();
  }

  onVerDetalhes(service: any) {
    console.log(service);
    this.navCtrl.push('MyJobDetalhePage', { job: service });
  }

  _onLoadListServices() {
    // TODO
  }

}
