import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
    public navParams: NavParams,
    private storage: Storage
  ) {
    this.storage.get("USER").then((user) => {
      this.nomeUsuario = user;
      this.nome = this.nomeUsuario.nome;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaymentSetvicesPage');
    console.log(this.serviceCompleto);
  }

}
