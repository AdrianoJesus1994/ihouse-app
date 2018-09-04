import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class UserDataProvider {

  constructor(private storage: Storage, private afAuth: AngularFireAuth) { }

  getUser(): Observable<User> {
    return this.afAuth.user;
  }
  setUser(user: firebase.User): void {
    this.storage.set("loggedUser", user);
  }
}