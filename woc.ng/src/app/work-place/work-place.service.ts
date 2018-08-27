import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WorkPlace } from './work-place.model';
import { BaseService } from '../shared/services/base-service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WorkPlaceService extends BaseService {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }


  getAllAsync(): Observable<WorkPlace[]> {
    return this.httpClient.get<WorkPlace[]>(this.configUrl + 'WorkPlace');
  }

  GetCountries(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.configUrl + 'WorkPlace/' + 'GetCountries');
  }

  GetCitiesByCountry(country: string): Observable<string[]> {
    return this.httpClient.get<string[]>(this.configUrl + 'WorkPlace/' + 'GetCitiesByCountry' + '?Country=' + country);
  }

  GetWorkplacesByCountryCity(workPlace: WorkPlace): Observable<string[]> {
    return this.httpClient.post<string[]>(this.configUrl + 'WorkPlace/' + 'GetWorkplacesByCountryCity' , workPlace);
  }

  GetWorkplaceByCountryCityWorkPlace(workPlace: WorkPlace): Observable<WorkPlace> {
    // const n = {Id : workPlace.id, Country : workPlace.country, City : workPlace.city, Name : workPlace.name };
    return this.httpClient.post<WorkPlace>(this.configUrl + 'WorkPlace/' + 'GetWorkplaceByCountryCityWorkPlace', workPlace);
  }
}

  // **********************************************fake part ************************************************** */
  // data: Array<WorkPlace>;

  // constructor() {
  //   this.data = new Array<WorkPlace>();
  //   this.fillData();
  // }


  // GetAll(): Observable<WorkPlace[]> {
  //   return new Observable((observer) => {
  //     // observable execution
  //     observer.next(this.data);
  //     observer.complete();
  //   });
  // }


  // GetAllLocations(): Observable<string[]> {
  //   // get distinct values
  //   const ret = Array.from(new Set(this.data.map((l) => l.name)));
  //   return new Observable((observer) => {
  //     observer.next(ret);
  //     observer.complete();
  //   });
  // }

  // GetCountries(): Observable<string[]> {
  //   // get distinct values
  //   const ret = Array.from(new Set(this.data.map((l) => l.country)));
  //   return new Observable((observer) => {
  //     observer.next(ret);
  //     observer.complete();
  //   });
  // }

  // GetCitiesByCountry(country: string): Observable<string[]> {
  //   // get distinct values
  //   const ret = Array.from(new Set(this.data.filter(l => l.country === country).map((l) => l.city)));
  //   return new Observable((observer) => {
  //     observer.next(ret);
  //     observer.complete();
  //   });
  // }

  // GetWorkplacesByCity(city: string): Observable<string[]> {
  //   // get distinct values
  //   const ret = Array.from(new Set(this.data.filter(l => l.city === city).map((l) => l.name)));
  //   return new Observable((observer) => {
  //     observer.next(ret);
  //     observer.complete();
  //   });
  // }


  // fillData() {
  //   this.data.push({id: '9f1dfae9-b8df-4409-8fa6-52a8d733958c', country : 'CH', city : 'Zürich', name : 'Dübi'});
  //   this.data.push({id: '5e2acc2f-58b6-4bbc-baeb-83f881e3b67e', country : 'CH', city : 'Zürich', name : 'Oerlikon'});
  //   this.data.push({id: 'b19e37f0-fa90-4edf-9402-ff834133b3ef', country : 'CH', city : 'Bern', name : 'Technopark'});
  //   this.data.push({id: 'aa3cdd6a-2fad-4dad-b3d0-eff8647f0e56', country : 'CH', city : 'Bern', name : 'BKB'});
  //   this.data.push({id: 'dbd8f137-3938-46ff-8ebc-a8db2e8e640d', country : 'DE', city : 'München', name : 'Business Center'});
  // }
// }
