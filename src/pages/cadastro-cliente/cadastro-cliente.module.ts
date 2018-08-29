import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroClientePage } from './cadastro-cliente';
import { Camera } from 'ionic-native';

@NgModule({
  declarations: [
    CadastroClientePage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroClientePage),
  ],
  providers: [Camera]
})
export class CadastroClientePageModule { }
