import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SystemInfo } from './system-info.model';
import { environment } from '../../environments/environment';


@Injectable()
export class SystemInfoService {
    private configUrl = '';

    constructor(private httpClient: HttpClient) {
        this.configUrl = environment.apiUrl;
    }

    getSystemInfo(): Observable<SystemInfo> {
        return this.httpClient.get<SystemInfo>(this.configUrl + 'systeminfo');
      }
}
