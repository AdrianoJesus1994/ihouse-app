import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class UserDataProvider {

  constructor(public storage: Storage) { }

  getUser(): Promise<any> {
    return this.storage.get("loggerUser");
  }
  setUser(user): void {
    this.storage.set("loggerUser", user);
  }
}
