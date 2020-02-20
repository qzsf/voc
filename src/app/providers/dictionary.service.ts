import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap,map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  private url = 'http://dummy.restapiexample.com/api/v1/';

  constructor(private _http: HttpClient) { }

  getWords$ = this._http.get(`${this.url}employees`)
    .pipe(
      map(employees => employees['data']),
      tap(data => console.log(JSON.stringify(data))),
    )
}
