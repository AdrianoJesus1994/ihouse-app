import { AngularFireDatabase } from 'angularfire2/database';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
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
    private auth: AngularFireAuth,
    private db: AngularFireDatabase,
    private storage: Storage
  ) { }

  ionViewDidLoad(): void {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(): void {
    var me = this;
    let alert = this.alertCtrl.create();
    alert.present();
    this.auth.auth.signInWithEmailAndPassword(this.email, this.senha)
      .then((res) => {
        return this.db.list("/user").valueChanges().subscribe((res) => {
          let user = res.filter((el) => { return el.email == me.email })[0];
          this.storage.set("USER", user);
          alert.dismiss();
          this.navCtrl.setRoot('HomePage');
        })

      })
      .catch((err) => {
        alert.dismiss();
        this.dialogo.presentAlert("Informe o Login e Senha para acessar.");
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
            this.auth.auth.sendPasswordResetEmail(data.email);
          }
        }
      }]
    });
    alert.present();
  }

}
