import { UserDataProvider } from './../../providers/user-data/user-data';
import { Camera, CameraOptions } from 'ionic-native';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { User } from '../../interfaces/user';

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
    private auth: AuthProvider,
    private db: DatabaseProvider
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
      this.auth.register(this.usuario.email, this.usuario.senha)
        .then((res) => {
          loading.dismiss();
          console.log(res);
          if (res) {
            me.createUser(res.user.uid);
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
  private createUser(id: string): void {
    const filePath = `users/${id}.png`;
    if (this.usuario.photo) this.auth.uploadPhoto(filePath, this.usuario.photo);
    this.auth.updateProfile(this.usuario.nome, filePath).then(() => {
      this.navCtrl.setRoot("HomePage");
    });
    this.db.createUser<User>(`${this.type}/${id}`, {
      name: this.usuario.nome,
      phone: this.usuario.tel,
      socialSecurity: this.usuario.socialSecurity
    });
  }
  openCamera(): void {
    Camera.getPicture(options).then((imageData) => {
      this.usuario.photo = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }
}