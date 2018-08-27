import { Component, OnInit } from '@angular/core';
import { SystemInfo } from './system-info.model';
import { SystemInfoService } from './system-info.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.scss']
})
export class SystemInfoComponent implements OnInit {

  si: SystemInfo;

  constructor(private systemInfoService: SystemInfoService) {
    this.si = new SystemInfo(false, '', 'unknown', 'unknown');
    systemInfoService.getSystemInfo().subscribe(i => {
      this.si.dbWorks = i.dbWorks;
      this.si.dbCheckError = i.dbCheckError;
    });
    this.si.ApiUrl = environment.apiUrl;
    this.si.Stage = environment.production ? 'production' : 'not Production';
  }

  ngOnInit() {
  }

}
