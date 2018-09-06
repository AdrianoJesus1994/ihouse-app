import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public nome: string = "";

  constructor(private navCtrl: NavController, auth: AuthProvider) {
    auth.getUser().subscribe((user) => {
      this.nome = user.displayName;
    });
  }

  onMensagens(): void {
    this.navCtrl.push('MessagesPage');
  }

  onMyJobs(): void {
    this.navCtrl.push('MyjobsPage');
  }

  onOfferJobs(): void {
    this.navCtrl.push('JobCategoryPage');
  }

  onSettings(): void {
    console.log("onSettings()");
  }

  onSearchJobs(): void {
    this.navCtrl.push('SearchJobsPage');
  }
}
