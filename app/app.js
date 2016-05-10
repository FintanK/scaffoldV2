import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {Scaffold} from './pages/home/home';
import {enableProdMode} from 'angular2/core';

enableProdMode();

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {}
})
export class MyApp {
  static get parameters() {
    return [[Platform]];
  }

  constructor(platform) {
    this.rootPage = Scaffold;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
