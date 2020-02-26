import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('dictionary')
        .then(res => {
          if (!res) {
            this.storage.set('dictionary', {});
            // import('./providers/data/a')
            //   .then(a => dictionary.a = a);
            // import('./providers/data/a')
            //   .then(b => dictionary.b = b);
            // .then(z=> {console.log(z.default)});
          }
        }
        )
    });
  }
}
