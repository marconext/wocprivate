import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Industry } from '../Industry.model';
import { ProjectsService } from '../../projects/projects.service';

@Component({
  selector: 'app-industries-browser',
  templateUrl: './industries-browser.component.html'
})
export class IndustriesBrowserComponent implements OnInit {

  @Input() industries: Industry[];
  @Output() industryChanged = new EventEmitter<Industry>();

  filteredindustries: Industry[] = [];
  filterText: string;

  constructor() {
    this.filteredindustries = [];
  }

  ngOnInit() {
    if (this.industries) {
      this.filteredindustries = this.industries;
    }
  }

  onIndustryItemClicked(industry: Industry) {
    this.industryChanged.emit(industry);
  }

  onFilterChanged(filterText: string) {
    this.filteredindustries = this.industries.filter(c => c.name.toUpperCase().startsWith(filterText.toUpperCase()));
  }
}
