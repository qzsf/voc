import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, debounce, filter } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  searchForm: FormGroup;
  constructor(
    public modalCtl: ModalController,
    public storage: Storage,
    private _fb: FormBuilder
  ) { }

  ngOnInit() {
    // search form
    this.searchForm = this._fb.group({
      search: ['']
    });

    this.search();
  }

  search() {
    this.searchForm.get('search').valueChanges
      .pipe(
        // start search when input more than 2 characters
        filter(val=> /^.{2,}/.test(val)),
        tap(res => console.log(res)),
        // ignore input in between 2000ms
        debounce(() => timer(2000)),
      )
      .subscribe(val => {
        console.log('after debounce ', val)
      })
  }

  dismiss() {
    this.modalCtl.dismiss({
      'dismissed': true
    })
  }

}
