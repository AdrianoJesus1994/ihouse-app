import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { auth } from 'firebase';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class AuthProvider {

  constructor(private afAuth: AngularFireAuth, private afStorage: AngularFireStorage) { }

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

  uploadPhoto(path: string, imageData: any): void {
    this.afStorage.upload(path, imageData);
  }

  resetPassword(email: string): void {
    this.afAuth.auth.sendPasswordResetEmail(email);
  }
}
