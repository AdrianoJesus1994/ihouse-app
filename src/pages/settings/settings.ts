import { Dialog } from './../../providers/dialog/dialog';
import { UserInterface } from './../../interfaces/user';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  usuario: UserInterface;
  email: string;
  photo: string;
  name: string;
  phone: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthProvider,
    public dialog: Dialog
  ) {
  }

  ionViewCanEnter(){
    this.dialog.showLoading();
    this.auth.getUser().subscribe((val) => {
      if(val){
        console.log(val);
        this.name = val.displayName;
        this.phone = val.phoneNumber;
        this.email = val.email;
        this.photo = val.photoURL;
        this.dialog.hideLoading();
        return true;
      }
      return;
    });
    this.dialog.hideLoading();   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    
  }

}
