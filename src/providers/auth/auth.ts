import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth) { }

  login(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): void {
    this.afAuth.auth.signOut();
  }

  register(email: string, password: string): Promise<auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  updateProfile(displayName: string, photoURL: string): Promise<void> {
    return this.afAuth.auth.currentUser.updateProfile({
      displayName: displayName,
      photoURL: photoURL
    })
  }

  resetPassword(email: string): void {
    this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
