import { Adal5HTTPService, Adal5Service } from 'adal-angular5';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHttpService {
    constructor(
        private adal5HttpService: Adal5HTTPService,
        private adal5Service: Adal5Service
    ) { }

    public get(url: string): Observable<any> {
        const options = this.prepareOptions();
        return this.adal5HttpService.get(url, options);
    }
    // public get<T>(url: string): Observable<T> {
    //     const options = this.prepareOptions();
    //     return Observable.from<T>(this.adal5HttpService.get(url, options));
    // }

    private prepareOptions(): any {
    let headers = new HttpHeaders();
            headers = headers
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${this.adal5Service.userInfo.token}`);
            return { headers };
    }
}
