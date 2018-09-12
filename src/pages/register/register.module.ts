import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { MaskDirectiveModule } from '../../directives/mask/mask';

@NgModule({
  declarations: [RegisterPage],
  imports: [
    MaskDirectiveModule,
    IonicPageModule.forChild(RegisterPage)
  ],
  providers: [Camera, File]
})
export class RegisterPageModule { }
