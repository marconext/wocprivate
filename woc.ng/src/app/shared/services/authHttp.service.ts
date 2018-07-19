import { Adal6HTTPService, Adal6Service } from 'adal-angular6';
import { Observable, from } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthHttpService {
    options: any;
    constructor(
        private adal6HttpService: Adal6HTTPService,
        private adal6Service: Adal6Service
    ) {
        this.options = this.prepareOptions();
    }

    // public get(url: string): Observable<any> {
    //     return this.adal5HttpService.get(url, this.options);
    // }

    public get<T>(url: string): Observable<T> {
        return from<T>(this.adal6HttpService.get(url, this.options));
    }

    private prepareOptions(): any {
    let headers = new HttpHeaders();
            headers = headers
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${this.adal6Service.userInfo.token}`);
            return { headers };
    }
}
