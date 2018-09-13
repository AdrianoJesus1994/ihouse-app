import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SettingsPage } from './settings';
import { MaskDirectiveModule } from '../../directives/mask/mask';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    MaskDirectiveModule,
    IonicPageModule.forChild(SettingsPage),
  ],
})
export class SettingsPageModule { }
