import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';

@Injectable()
export class UserDataProvider {

  constructor(private storage: Storage, private afAuth: AngularFireAuth) { }

  getUser(): User {
    return this.afAuth.auth.currentUser;
  }
  setUser(user: firebase.User): void {
    this.storage.set("loggedUser", user);
  }
}