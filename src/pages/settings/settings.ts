import { DatabaseProvider } from './../../providers/database/database';
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
  userID: string = "";
  email: string = "";
  photo: string = "";
  name: string = "";
  phone: string = "";
  address: string = "";
  photoURL: string = "";
  password: string = "";

  editName: boolean = false;
  editAddress: boolean = false;
  editPhone: boolean = false;

  constructor(private navCtrl: NavController ,private auth: AuthProvider, private dialog: Dialog, private database: DatabaseProvider) { }

  ionViewDidLoad(): void {
    this.dialog.showLoading();
    this.auth.getUser().subscribe((val) => {
      this.database.getEmployeeByID<UserInterface>(val.uid).subscribe((user) => {
        this.dialog.hideLoading();
        this.userID = val.uid;
        this.address = user.address;
        this.phone = user.phone;
        this.name = val.displayName;
        this.photoURL = val.photoURL;
      }, (err) => {
        this.dialog.hideLoading();
      });
    });
  }

  onName(): void {
    const isEditing = this.editName;
    this.editName = !this.editName;
    if (!isEditing) return;
    this.updateUser();
    this.auth.updateProfile(this.name, this.photoURL);
  }
  onAddress(): void {
    const isEditing = this.editAddress;
    this.editAddress = !this.editAddress;
    if (!isEditing) return;
    this.updateUser();

  }
  onPhone(): void {
    const isEditing = this.editPhone;
    this.editPhone = !this.editPhone;
    if (!isEditing) return;
    this.updateUser();
  }

  onPassword(): void {
    this.dialog.showLoading();
    this.auth.updatePassword(this.password)
      .then((res) => {
        this.dialog.hideLoading();
        console.log("SUCESSO");
      }).catch((err) => {
        this.dialog.hideLoading();
        if (err.code === "auth/requires-recent-login") {
          this.navCtrl.setRoot("LoginPage").then(() => {
            this.auth.logout();
          });
          this.dialog.presentAlert(err.message);
        }
        console.log(err);
      })
  }

  private updateUser(): void {
    this.dialog.showLoading();
    this.database.updateUser<UserInterface>(this.userID, {
      name: this.name,
      address: this.address,
      phone: this.phone
    }).then((res) => {
      this.dialog.hideLoading();
      console.log("SUCESSO");
    }).catch((err) => {
      this.dialog.hideLoading();
      console.log(err);
    })
  }
}
