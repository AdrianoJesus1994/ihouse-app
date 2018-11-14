import { UserInterface } from './../../interfaces/user';
import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Category } from '../../interfaces/category';
import { DatabaseProvider } from '../../providers/database/database';
import { Dialog } from '../../providers/dialog/dialog';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public name: string = "";
  public isAutorized: boolean;
  public userData: UserInterface;

  constructor(
    private navCtrl: NavController,
    auth: AuthProvider,
    private dataBase: DatabaseProvider,
    private dialog: Dialog,
    private database: DatabaseProvider,
    private navParams: NavParams
  ) {
    auth.getUser().subscribe((user) => {
      console.log(user.getIdToken());
      this.name = user.displayName;
      this.userData = this.navParams.data;
      if(this.userData == null){
        this.database.getUserByID<UserInterface>(user.uid).subscribe((userData) => {
          console.log(user);
          this.userData = userData;
        });
      }
      console.log("USER", this.userData);
    });
  }

  onMensagens(): void {
    this.navCtrl.push('MessagesPage');
  }

  onMyJobs(): void {
    this.navCtrl.push('MyjobsListPage');
  }

  onOfferJobs(): void {
    this.navCtrl.push('JobCategoryPage');
  }

  onSettings(): void {
    this.navCtrl.push('SettingsPage');
  }

  onSearchJobs(): void {
    const me = this;
    this.database.getCategories<Category>().subscribe((categories) => {
      me.navCtrl.push('SearchJobsPage', { categories: categories });
    }, (err) => me.dialog.presentAlert(err.message));
  }
}
