import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { AuthProvider } from '../providers/auth/auth';

export interface PageInterface {
  title: string;
  component: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string;

  pages: PageInterface[] = [
    { title: 'Home', component: 'HomePage' },
    { title: 'Offer Job', component: 'CategoriaServicosPage' },
    { title: 'Search Job', component: 'SearchJobsCatPage' },
    { title: 'My Jobs', component: 'MyjobsPage' },
    { title: 'Messages', component: 'MensagensPage' },
    { title: 'Settings', component: 'HomePage' }
  ];

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    screen: ScreenOrientation,
    private auth: AuthProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#0abab5');
      splashScreen.hide();
      if (platform.is('mobile') && !platform.is('mobileweb')) {
        screen.lock(screen.ORIENTATIONS.PORTRAIT);
      }
      auth.getUser().subscribe((res) => {
        this.rootPage = (res && res.emailVerified) ? "HomePage" : "LoginPage";
      }, (err) => {
        console.log('ERRo', err);
        this.rootPage = "LoginPage";
      });
    });
  }

  openPage(page: PageInterface): void {
    this.nav.setRoot(page.component);
  }

  onLogout(): void {
    this.auth.logout();
    this.nav.setRoot('LoginPage');
  }
}
