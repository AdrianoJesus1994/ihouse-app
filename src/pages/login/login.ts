import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { DialogoProvider } from '../../providers/dialogo/dialogo';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  email: string = "";
  password: string = "";
  zipCode: string = "";

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private dialog: DialogoProvider,
    private auth: AuthProvider
  ) { }

  onLogin(): void {
    this.dialog.showLoading();
    this.auth.login(this.email, this.password)
      .then(() => {
        this.dialog.hideLoading();
        this.navCtrl.setRoot("HomePage");
      }, (err) => this.dialog.presentAlert(err.message));
  }

  onSingIn(): void {
    this.navCtrl.push('RegisterPage');
  }

  onForgot(): void {
    let alert = this.alertCtrl.create({
      message: "Type your e-mail:",
      inputs: [{ name: 'email', placeholder: 'E-mail' }],
      buttons: ['Cancel', {
        text: 'Send', handler: data => {
          if (data.email) {
            this.auth.resetPassword(data.email);
          }
        }
      }]
    });
    alert.present();
  }

}
