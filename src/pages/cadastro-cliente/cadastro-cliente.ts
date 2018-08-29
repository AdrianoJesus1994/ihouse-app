import { Camera, CameraOptions } from 'ionic-native';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

/**
 * Generated class for the CadastroClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const options: CameraOptions = {
  quality: 100,
  destinationType: Camera.DestinationType.FILE_URI,
  encodingType: Camera.EncodingType.JPEG,
  mediaType: Camera.MediaType.PICTURE
}

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {

  public usuario = {
    nome: "",
    email: "",
    photo: "",
    endereco: "",
    tel: "",
    senha: "",
    confirmSenha: ""
  }

  constructor(
    public navCtrl: NavController,
    public dialogo: DialogoProvider,
    private alertCtrl: AlertController,
    private auth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroClientePage');
  }

  onRegister() {
    let me = this;
    if (this.usuario.senha !== this.usuario.confirmSenha) {
      this.dialogo.presentAlert("As senhas não conferem");
    } else {
      let alert = this.alertCtrl.create();
      alert.present();
      this.auth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha)
        .then((res) => {
          alert.dismiss();
          console.log(res);
          if (res) {
            me.createUser();
            // me.dialogo.presentAlert("Cadastro realizado com sucesso!");
            // me.navCtrl.pop();
          } else {
            me.dialogo.presentAlert("Problemas ao realizar o seu cadastro");
          }
        }).catch((error) => {
          alert.dismiss();
          me.dialogo.presentAlert("Problemas ao realizar o seu cadastro");
          console.error(error);
        })
    }
  }
  private createUser(): void {
    this.db.list("user").push(this.usuario);
  }
  openCamera(): void {
    Camera.getPicture(options).then((imageData) => {
      this.usuario.photo = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      // Handle error
     });
  }
}