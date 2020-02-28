import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SearchPage } from '../search/search.page';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  letters = "abcdefghijklmnopqrstuvwxyz".split('');

  constructor(public modalCtl: ModalController) { }

  ngOnInit() {
  }

  async showModal(){
    const modal = await this.modalCtl.create({
      component: SearchPage
    });
    return await modal.present();
  }

}
