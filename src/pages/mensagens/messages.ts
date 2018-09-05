import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { DialogoProvider } from '../../providers/dialogo/dialogo';
import { DatabaseProvider } from '../../providers/database/database';
import { Message } from '../../interfaces/message';

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  mensagens: Message[];

  constructor(private dialog: DialogoProvider, private database: DatabaseProvider) { }

  ionViewDidLoad(): void {
    this.database.getMessages<Message>().subscribe((res) => {
      this.mensagens = res;
    }, err => {
      // TODO
    });
  }

  onVerMensagemCompleta(msg: Message): void {
    this.dialog.presentMessage(msg.title, msg.body);
  }
}
