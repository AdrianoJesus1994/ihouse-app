import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UserDataProvider } from './../../providers/user-data/user-data';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public nome: string = "";

  constructor(public navCtrl: NavController, userProvider: UserDataProvider) {
    userProvider.getUser().subscribe((user) => {
      this.nome = user.displayName;
    });
  }

  onMensagens(): void {
    console.log("onMensagens()");
    this.navCtrl.push('MensagensPage');
  }

  onMyJobs(): void {
    console.log("onMyJobs()");
    this.navCtrl.push('MyjobsPage');
  }

  onOfferJobs(): void {
    this.navCtrl.push('CategoriaServicosPage');
    console.log("onOfferJobs()");
  }

  onSettings(): void {
    console.log("onSettings()");
  }

  onSearchJobs(): void {
    console.log("onSearchJobs()");
    this.navCtrl.push('SearchJobsCatPage');
  }
}
