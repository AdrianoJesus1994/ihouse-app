import { UserDataProvider } from './../../providers/user-data/user-data';
import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public nomeUsuario: any;
  public nome;


  constructor(public navCtrl: NavController, userProvider: UserDataProvider) {
    userProvider.getUser().then((user) => {
      this.nome = user.nome;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  onMensagens() {
    console.log("onMensagens()");
    this.navCtrl.push('MensagensPage');
  }

  onMyJobs() {
    console.log("onMyJobs()");
    this.navCtrl.push('MyjobsPage');
  }

  onOfferJobs() {
    this.navCtrl.push('CategoriaServicosPage');
    console.log("onOfferJobs()");
  }

  onSettings() {
    console.log("onSettings()");
  }

  onSearchJobs() {
    console.log("onSearchJobs()");
    this.navCtrl.push('SearchJobsCatPage');
  }

}
