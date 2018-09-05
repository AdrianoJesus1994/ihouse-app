import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-payment-services',
  templateUrl: 'payment-services.html',
})
export class PaymentServicesPage {

  serviceCompleto: any = null;
  nome: string = "";

  constructor(private navCtrl: NavController, navParams: NavParams, auth: AuthProvider) {
    this.serviceCompleto = navParams.data.servico;
    auth.getUser().then((val) => {
      this.nome = val.displayName;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentSetvicesPage');
    console.log(this.serviceCompleto);
  }

}
