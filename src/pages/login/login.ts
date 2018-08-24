import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

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
    private auth: AngularFireAuth
  ) { }

  ionViewDidLoad(): void {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(): void {
    let alert = this.alertCtrl.create();
    alert.present();
    this.auth.auth.signInWithEmailAndPassword(this.email, this.senha)
      .then((res) => {
        alert.dismiss();
        this.navCtrl.setRoot('HomePage');
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

}
