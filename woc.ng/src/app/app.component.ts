import { Component, ViewContainerRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(public toastr: ToastrService , vcr: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(vcr);
  }

  sendToast() {
    this.toastr.success('You are awesome!', 'Success!');
  }
}
