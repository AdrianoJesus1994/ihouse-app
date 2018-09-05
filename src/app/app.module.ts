import { AngularFireAuth } from 'angularfire2/auth';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { Dialog } from './../providers/dialog/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { PaypalProvider } from '../providers/paypal/paypal';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { FIREBASE_CONFIG } from '../assets/config/firebase.service';
import { IonicStorageModule } from '@ionic/storage';
import { AuthProvider } from '../providers/auth/auth';
import { DatabaseProvider } from '../providers/database/database';

@NgModule({
  declarations: [MyApp],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, { mode: 'md' }),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
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
    AngularFireAuth,
    AngularFireDatabase,
    Dialog,
    PaypalProvider,
    AuthProvider,
    DatabaseProvider
  ]
})
export class AppModule { }
