import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from '../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: 'page-payment-services',
  templateUrl: 'payment-services.html',
})
export class PaymentServicesPage {

  serviceCompleto: any = null;
  public nomeUsuario: any = null;
  public nome: string = "";

  constructor(
    public navCtrl: NavController,
    navParams: NavParams,
    user: UserDataProvider
  ) {
    this.serviceCompleto = navParams.data.servico;
    user.getUser().subscribe((val) => {
      this.nome = val.displayName;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentSetvicesPage');
    console.log(this.serviceCompleto);
  }

}
