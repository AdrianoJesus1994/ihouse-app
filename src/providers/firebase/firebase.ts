import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';

@Injectable()
export class FirebaseProvider {
  constructor(public firebase: Firebase) { }

  login(): void {
  }
}
