import { Injectable } from '@angular/core';
import { AlertController, Loading, Alert, LoadingController } from 'ionic-angular';

@Injectable()
export class DialogoProvider {
  private loading: Loading;
  private alert: Alert;

  constructor(private loadingCtrl: LoadingController, private alertCtrl: AlertController) { }

  showLoading(): void {
    if (!!this.loading) return;
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }

  hideLoading(): void {
    if (!this.loading) return;
    this.loading.dismiss();
    this.loading = null;
  }

  presentAlert(msg: string): void {
    if (!!this.loading) this.hideLoading();
    this.alert = this.alertCtrl.create({ title: msg, buttons: ['OK'] });
    this.alert.present();
  }

  presentMessage(title: string, msg: string): void {
    if (!!this.loading) this.hideLoading();
    this.alert = this.alertCtrl.create({ title: title, message: msg, buttons: ['Close'] });
    this.alert.present();
  }
}
