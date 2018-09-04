import { AuthProvider } from './../../providers/auth/auth';
import { UserDataProvider } from './../../providers/user-data/user-data';
import { AngularFireDatabase } from 'angularfire2/database';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email: string = "";
  public senha: string = "";
  public zipCode: string;

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private dialogo: DialogoProvider,
    private loadingCtrl: LoadingController,
    private auth: AuthProvider,
    private db: AngularFireDatabase,
    private userDataProvider: UserDataProvider,
    private storage: Storage
  ) { }

  ionViewDidLoad(): void {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(): void {
    var loading = this.loadingCtrl.create();
    loading.present();
    this.auth.login(this.email, this.senha)
      .then(() => {
        loading.dismiss();
        this.navCtrl.setRoot("HomePage");
      }, (err) => {
        loading.dismiss();
        this.dialogo.presentAlert(err.message);
      });
  }

  onSingIn() {
    console.log("Cadastrar novo usuário.");
    this.navCtrl.push('CadastroClientePage');
  }

  onForgot() {
    var alert = this.alertCtrl.create({
      message: "Type your e-mail:",
      inputs: [{
        name: 'email',
        placeholder: 'E-mail'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Send',
        handler: data => {
          if (data.email) {
            this.auth.resetPassword(data.email);
          }
        }
      }]
    });
    alert.present();
  }

}
