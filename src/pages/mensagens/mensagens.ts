import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { MensagensProvider } from '../../providers/mensagens/mensagens';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Message } from '../../interfaces/message';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

/**
 * Generated class for the MensagensPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mensagens',
  templateUrl: 'mensagens.html',
})
export class MensagensPage {

  mensagens: Message[];

  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, private dialogo:DialogoProvider, private mensageProvider: MensagensProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MensagensPage');
    this._onLoadMensagens();
  }

  _onLoadMensagens(){
    this.mensageProvider.getListMensagens().subscribe((res) => {
      if(res.length > 0) {
        this.mensagens = res;
      }
    }, err => {
      // TODO
    });
  }

  onVerMensagemCompleta(msg:any){
    this.dialogo.presentMessage(msg.title, msg.mensagem);
  }

}
