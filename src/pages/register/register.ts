import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Dialog } from '../../providers/dialog/dialog';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { UserInterface } from '../../interfaces/user';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  type: string = "employer";
  name: string = "";
  email: string = "";
  ssn: string = "";
  photo: string = "";
  address: string = "";
  phone: string = "";
  password: string = "";
  passwordConfirm: string = "";

  constructor(
    private navCtrl: NavController,
    private camera: Camera,
    private file: File,
    private dialog: Dialog,
    private auth: AuthProvider,
    private db: DatabaseProvider
  ) { }

  onRegister(): void {
    if (this.password !== this.passwordConfirm) {
      this.dialog.presentAlert("As senhas não conferem");
      return;
    }
    this.dialog.showLoading();
    this.auth.register(this.email, this.password)
      .then((res) => {
        this.dialog.hideLoading();
        this.createUser(res.user.uid);
      }).catch((err) => {
        this.dialog.presentAlert(err.message);
      })
  }
  openCamera(): void {
    const options: CameraOptions = {
      quality: 100,
      cameraDirection: 1,
      targetHeight: 400,
      targetWidth: 400,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      this.photo = `${imageData}`;
    }, (err) => {
      this.dialog.presentAlert(err);
    });
  }
  private createUser(id: string): void {
    const fileName = `${id}`;
    const filePath = `${fileName}.png`;
    if (this.photo) {
      this.file.createFile(this.photo, fileName, true).then((entry) => {
        entry.file((file) => {
          this.auth.uploadPhoto(file).then((upload) => {
            console.log(upload);
          });
        });
      });
    }
    this.auth.updateProfile(this.name, filePath).then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
    this.db.createUser<UserInterface>(`user/${id}`, {
      name: this.name,
      phone: this.phone,
      address: this.address,
      type: this.type,
      urlPhoto: '',
      ssn: this.ssn,
      rating: 5
    });
  }
}