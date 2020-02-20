import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { DictionaryService } from 'src/app/providers/dictionary.service';
// import { Observable } from 'rxjs';

import { Storage } from '@ionic/storage';

// import z from '../../providers/data/DZ';

@Component({
  selector: 'app-letter',
  templateUrl: './letter.page.html',
  styleUrls: ['./letter.page.scss'],
})
export class LetterPage implements OnInit {
  letter: string;
  wordList = [];
  // wordList$: Observable<any[]>;
  defaultHref: string;


  constructor(
    private _route: ActivatedRoute,
    public storage: Storage
    // private _dictionary: DictionaryService
  ) { }

  ngOnInit() {
    this._route.paramMap.subscribe(
      params => {
        this.letter = params.get('id').toUpperCase();
        // this.wordList$ = this._dictionary.getWords$;
        // this.wordList$.subscribe();
        // const arr = Object.keys(z).map(k => ({key:k,value:z[k]}));
        // console.log(arr.find(w=>w.key==='ZEBRA'));
        this.storage.get('dictionary').then(res => {
          // console.log(res)
          // const arr = Object.keys(res).map(k => ({ key: k, value: res[k] }));
          this.wordList = res.filter(w => w.value.SAT);
          // console.log(this.wordList)
        })

      }
    )
  }
  ionViewDidEnter() {
    this.defaultHref = `/main/tabs/list`;
  }

}
