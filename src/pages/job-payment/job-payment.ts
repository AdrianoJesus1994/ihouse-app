import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PaypalProvider } from '../../providers/paypal/paypal';
import { Job } from '../../interfaces/job';
import { Dialog } from '../../providers/dialog/dialog';

@IonicPage()
@Component({
  selector: 'page-job-payment',
  templateUrl: 'job-payment.html',
})
export class JobPaymentPage {
  name: string;
  employerID: number;
  job: Job;

  constructor(
    navParams: NavParams,
    auth: AuthProvider,
    private paypal: PaypalProvider,
    private dialog: Dialog
  ) {
    auth.getUser().subscribe((val) => {
      this.name = val.displayName;
      this.job = navParams.data.job;
      this.employerID = navParams.data.id;
    });
  }

  onPayment(): void {
    this.paypal.openPayment(`${this.job.category.value}`, 'USD', this.job.category.name)
      .then((res) => {
        console.log('SUCCESS', res);
      }).catch((err) => {
        this.dialog.presentAlert(err);
      });
  }
}
