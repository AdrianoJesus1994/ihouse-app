import { UserDataProvider } from './../../providers/user-data/user-data';
import { Camera, CameraOptions } from 'ionic-native';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

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
  type: string = "employer";

  public usuario = {
    nome: "",
    email: "",
    socialSecurity: "",
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
    private userDataProvider: UserDataProvider,
    private loadingCtrl: LoadingController,
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
      let loading = this.loadingCtrl.create();
      loading.present();
      this.auth.auth.createUserWithEmailAndPassword(this.usuario.email, this.usuario.senha)
        .then((res) => {
          loading.dismiss();
          console.log(res);
          if (res) {
            me.createUser();
          } else {
            me.dialogo.presentAlert("Problemas ao realizar o seu cadastro");
          }
        }).catch((error) => {
          loading.dismiss();
          me.dialogo.presentAlert("Problemas ao realizar o seu cadastro");
          console.error(error);
        })
    }
  }
  private createUser(): void {
    this.db.list("user").push(this.usuario);
    this.userDataProvider.setUser(this.usuario);
    this.navCtrl.setRoot("HomePage");
  }
  openCamera(): void {
    Camera.getPicture(options).then((imageData) => {
      this.usuario.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}