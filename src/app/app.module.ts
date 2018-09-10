import { PayPal } from '@ionic-native/paypal';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule, FirebaseOptions } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';

import { PaypalProvider } from '../providers/paypal/paypal';
import { Dialog } from './../providers/dialog/dialog';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';


const FIREBASE_OPTIONS: FirebaseOptions = {
  apiKey: "AIzaSyBWFR82-NDK2Ug3IMv8PAblLsORcOSCl94",
  authDomain: "ihouse-8ddbe.firebaseapp.com",
  databaseURL: "https://ihouse-8ddbe.firebaseio.com",
  projectId: "ihouse-8ddbe",
  storageBucket: "ihouse-8ddbe.appspot.com",
  messagingSenderId: "720602884263"
};

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_OPTIONS),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ScreenOrientation,
    Dialog,
    PaypalProvider,
    PayPal,
    AuthProvider,
    DatabaseProvider
  ]
})
export class AppModule { }
