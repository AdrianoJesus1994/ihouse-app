import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { UserDataProvider } from '../providers/user-data/user-data';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  private rootPage: string;

  pages: Array<{ title: string, component: any }> = [
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
    private userProvider: UserDataProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      //this.statusBar.backgroundColorByHexString("#0abab5");
      statusBar.backgroundColorByHexString('#0abab5');
      splashScreen.hide();
      if (platform.is('mobile')) {
        screen.lock(screen.ORIENTATIONS.PORTRAIT);
      }
      userProvider.getUser().then((user) => {
        this.rootPage = (!!user) ? "HomePage" : "LoginPage";
      })
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }

  onLogout() {
    this.nav.setRoot('LoginPage');
  }
}
