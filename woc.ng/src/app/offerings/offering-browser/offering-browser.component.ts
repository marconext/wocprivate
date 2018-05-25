import { Component, OnInit } from '@angular/core';
import { KeyNameHierarchyHelperService } from '../../shared/services/key-name-hierarchy-helper.service';
import { OfferingService } from '../offering.service';
import { Offering } from '../offering.model';

@Component({
  selector: 'app-offering-browser',
  templateUrl: './offering-browser.component.html',
  styleUrls: ['./offering-browser.component.scss']
})
export class OfferingBrowserComponent implements OnInit {

  allOfferings: Offering[];

  constructor(
    private offeringService: OfferingService,
    public keyNameService: KeyNameHierarchyHelperService
  ) {}

  ngOnInit() {
    this.offeringService.getAllAsync().subscribe(offerings => {
      this.allOfferings = offerings;
    });
  }
}
