import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchPage } from '../search/search.page';

import { Storage } from '@ionic/storage';
import * as _ from 'lodash';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  satList: any;
  // letters = "abcdefghijklmnopqrstuvwxyz".split('');

  loading = false;

  constructor(
    public modalCtl: ModalController,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.storage.get('sat').then(res => {
      if (res) {
        this.satList = this.toList(res);
      } else {
        this.loading = true;
      }
    });
  }

  ionViewDidEnter() {
    this.storage.get('sat').then(res => {
      if (!res || res === {}) {
        import('../../providers/sat')
          .then(sat => {
            this.satList = this.toList(sat.default);
            this.storage.set('sat', sat.default);
          });
      }else{
        this.satList = this.toList(res);
      }
    })
  }
  // group by a list of word by the first letter
  toList(arr) {
    // get sat not done list
    const notDone = arr.filter(i => i.done === false);
    const group = _.groupBy(notDone, o => o.word[0]);
    const list = Object.keys(group).map(k => ({ key: k, value: group[k] }));
    return list;
  }

  async showModal() {
    const modal = await this.modalCtl.create({
      component: SearchPage
    });
    return await modal.present();
  }

}
