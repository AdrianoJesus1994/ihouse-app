import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AuthProvider } from './../../providers/auth/auth';
import { Dialog } from '../../providers/dialog/dialog';

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
    private dialog: Dialog,
    private auth: AuthProvider
  ) { }

  onLogin(): void {
    this.dialog.showLoading();
    this.auth.login(this.email, this.password)
      .then((credential) => {
        this.dialog.hideLoading();
        if (credential.user.emailVerified) {
          this.navCtrl.setRoot("HomePage");
        } else {
          this.dialog.presentConfirm(
            'You need to verify your e-mail',
            'Do you want to resend your verification code?',
            () => credential.user.sendEmailVerification()
          )
        }
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
