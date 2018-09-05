import { Camera, CameraOptions } from 'ionic-native';
import { Dialog } from '../../providers/dialog/dialog';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { DatabaseProvider } from '../../providers/database/database';
import { Employee, Employer } from '../../interfaces/user';

const options: CameraOptions = {
  quality: 100,
  destinationType: Camera.DestinationType.FILE_URI,
  encodingType: Camera.EncodingType.JPEG,
  mediaType: Camera.MediaType.PICTURE
}

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  type: string = "employer";
  name: string = "";
  email: string = "";
  socialSecurity: string = "";
  photo: string = "";
  address: string = "";
  phone: string = "";
  password: string = "";
  passwordConfirm: string = "";

  constructor(
    private navCtrl: NavController,
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
    Camera.getPicture(options).then((imageData) => {
      this.photo = `${imageData}`;
    }, (err) => {
      this.dialog.presentAlert(err);
    });
  }
  private createUser(id: string): void {
    const filePath = `users/${id}.png`;
    if (this.photo) {
      this.auth.uploadPhoto(filePath, this.photo).then((upload) => {
        console.log(upload);
      });
    }
    this.auth.updateProfile(this.name, filePath).then(() => {
      this.navCtrl.setRoot("LoginPage");
    });
    if (this.type === "employer") {
      this.db.createUser<Employer>(`employer/${id}`, {
        name: this.name,
        phone: this.phone,
        address: this.address,
        socialSecurity: this.socialSecurity
      });
    } else {
      this.db.createUser<Employee>(`employee/${id}`, {
        name: this.name,
        phone: this.phone,
        address: this.address,
        rating: 5
      });
    }
  }
}