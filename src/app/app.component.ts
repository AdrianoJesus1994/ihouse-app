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
  photo: string = '../assets/icon/photo.svg';

  pages: PageInterface[] = [
    { title: 'Home', component: 'HomePage' },
    { title: 'Offer Job', component: 'JobCategoryPage' },
    { title: 'Search Job', component: 'SearchJobsPage' },
    { title: 'My Jobs', component: 'MyjobsListPage' },
    { title: 'Messages', component: 'MessagesPage' },
    { title: 'Settings', component: 'SettingsPage' }
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
      auth.getUser().subscribe((user) => {
        if (user && user.emailVerified) {
          if (user.photoURL) {
            this.auth.getPhoto(user.photoURL).subscribe((url) => {
              this.photo = url;
            });
          }
          this.rootPage = "HomePage";
        } else {
          this.rootPage = "LoginPage";
        }
      }, () => this.rootPage = "LoginPage");
    });
  }

  openPage(page: PageInterface): void {
    if (page.component === "HomePage") { return; }
    this.nav.push(page.component);
  }

  onLogout(): void {
    this.nav.setRoot('LoginPage').then(() => {
      this.auth.logout();
    });
  }
}
