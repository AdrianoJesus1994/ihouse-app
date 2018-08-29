import { Message } from './../../interfaces/message';
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from '../../../node_modules/rxjs';

/*
  Generated class for the MensagensProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MensagensProvider {

  constructor(public http: HttpClient, private db: AngularFireDatabase) {
    console.log('Hello MensagensProvider Provider');
  }

  getListMensagens(): Observable<Message[]> {
    return this.db.list<Message>("/message").valueChanges();
  }

}
