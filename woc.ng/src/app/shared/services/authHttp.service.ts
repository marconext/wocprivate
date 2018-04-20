import { Adal5HTTPService, Adal5Service } from 'adal-angular5';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHttpService {
    options: any;
    constructor(
        private adal5HttpService: Adal5HTTPService,
        private adal5Service: Adal5Service
    ) {
        this.options = this.prepareOptions();
    }

    // public get(url: string): Observable<any> {
    //     return this.adal5HttpService.get(url, this.options);
    // }

    public get<T>(url: string): Observable<T> {
        return Observable.from<T>(this.adal5HttpService.get(url, this.options));
    }

    private prepareOptions(): any {
    let headers = new HttpHeaders();
            headers = headers
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${this.adal5Service.userInfo.token}`);
            return { headers };
    }
}
