import { Injectable } from '@angular/core';
import { Offering } from './offering.model';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class OfferingService {

  configUrl = 'http://localhost:5000/api/';

  constructor(private httpClient: HttpClient) {
  }

  getAllAsync(): Observable<Offering[]> {
    return this.httpClient.get<Offering[]>(this.configUrl + 'offering');
  }
}


// @Injectable()
// export class OfferingService {
//   _offerings: Offering[];

//   constructor() {
//     this.fakeOfferings();
//   }

//   getAllAsync(): Observable<Offering[]> {

//     if (this._offerings != null && this._offerings !== undefined) {
//       return Observable.create(observer => {
//         observer.next(this._offerings);
//         observer.complete();
//       });
//     }
//   }


//   private fakeOfferings() {
//     this._offerings = [];
//     this._offerings.push(new Offering('44e5170d-e3b5-4e4c-8777-0b972d35c164', 'Offering 1', ';OFFERING-1'));
//     this._offerings.push(new Offering('a1a1776a-c2a0-4e0a-9661-e3cd28127b91', 'Offering 2', ';OFFERING-2'));
//   }
// }
