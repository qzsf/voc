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
  dictionary: any = {};
  wordList = [];
  // wordList$: Observable<any[]>;
  defaultHref: string;

  // for remove animation
  collapseState = 'in';
  outState = 'in';

  loading = false;

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
        // console.log(this.letter)
        // this.wordList$ = this._dictionary.getWords$;
        // this.wordList$.subscribe();
        // const arr = Object.keys(z).map(k => ({key:k,value:z[k]}));
        // console.log(arr.find(w=>w.key==='ZEBRA'));

        // 
        this.storage.get('dictionary').then(res => {
          if (res[this.letter]) {
            this.wordList = res[this.letter].filter(w => w.value.SAT);
          } else {
            this.loading = true;
          }
          // console.log(this.wordList)
          // const arr = Object.keys(res).map(k => ({ key: k, value: res[k] }));
          // this.wordList = res.filter(w => w.value.SAT);
          // console.log(this.wordList)
        });
      }
    )
  }
  ionViewDidEnter() {
    this.storage.get('dictionary').then(res => {
      if (this.loading) {
        console.log('import ')
        import(`../../providers/data/${this.letter}`)
          .then(w => {
            // console.log(w.default);
            this.wordList = w.default.filter(w => w.value.SAT);
            this.loading = false;
            const newD = { ...res };
            newD[this.letter] = this.wordList;
            this.storage.set('dictionary', newD);
          });
      }
      // console.log(this.wordList)
      // const arr = Object.keys(res).map(k => ({ key: k, value: res[k] }));
      // this.wordList = res.filter(w => w.value.SAT);
      // console.log(this.wordList)
    });

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

  remove(item) {
    this.wordList = this.wordList.filter(w => w.key !== item.key);
  }


}
