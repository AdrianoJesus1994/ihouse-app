import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterPage } from './register';
import { Camera } from 'ionic-native';

@NgModule({
  declarations: [RegisterPage],
  imports: [IonicPageModule.forChild(RegisterPage)],
  providers: [Camera]
})
export class RegisterPageModule { }
