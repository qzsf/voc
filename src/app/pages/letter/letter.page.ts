import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { DictionaryService } from 'src/app/providers/dictionary.service';
// import { Observable } from 'rxjs';
import { trigger, state, style, animate, transition, group, query, animateChild } from '@angular/animations';


import { Storage } from '@ionic/storage';

// import z from '../../providers/data/DZ';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.page.html',
  styleUrls: ['./letter.page.scss'],
  animations: [
    trigger('collapse', [
      transition('*=>void', [
        style({ height: '*' }),
        // Defines a list of animation steps to be run in parallel.
        group([
          animate(300, style({ height: '0', minHeight: '0' })),
          query('@remove', [animateChild()])
        ])
      ])
    ]),
    trigger('remove', [
      transition('*=>void', [
        style({ opacity: 1 }),
        animate(300, style({ opacity: 0, transform: 'translateX(-500px)' }))
      ])
    ])
  ]
})
export class LetterPage implements OnInit {
  letter: string;
  sat: any = [];
  wordList = [];
  // wordList$: Observable<any[]>;
  defaultHref: string;

  // for remove animation
  collapseState = 'in';
  outState = 'in';

  loading = true;

  // for dblclick
  timeStamp: number = 0;


  constructor(
    private _route: ActivatedRoute,
    public storage: Storage
    // private _dictionary: DictionaryService
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(
      params => {
        this.letter = params.get('id');
      }
    )
  }

  async getList(letter) {
    this.sat = await this.storage.get('sat');
    const notDone = this.sat.filter(i => i.done === false);
    // get a list of words start with "letter"
    const list = notDone.filter(w => w.word[0] === letter).map(w => w.word.toUpperCase());
    const dictionary = await this.storage.get('dictionary');
    this.wordList = dictionary[letter.toLowerCase()].filter(i =>
      list.includes(i.key));
    this.loading = false;
  }

  ionViewDidEnter() {
    this.getList(this.letter);
    this.defaultHref = `/main/tabs/list`;
  }

  onClick(event, item) {
    const now = new Date();
    // no native dblclick event
    // double click: two clicks in 300ms
    if ((now.getTime() - this.timeStamp) < 300) {
      console.log('double click ', now.getTime() - this.timeStamp)
    }
    this.timeStamp = now.getTime();
  }

  onDrag(event, item) {
    if (event.detail.ratio > 2) {
      this.remove(item);
    }
  }
  
  // remove and update the "sat" storage
  remove(item) {
    // item: {key: "ABYSMAL", value: {…}}
    let key = item.key.toLowerCase();
    key = key.charAt(0).toUpperCase() + key.slice(1);
    this.wordList = this.wordList.filter(w => w.key !== item.key);
    const newSat = [...this.sat];
    let word = newSat.find(w=>w.word===key);
    word.done = true;
    this.storage.set('sat', newSat);
  }


}
