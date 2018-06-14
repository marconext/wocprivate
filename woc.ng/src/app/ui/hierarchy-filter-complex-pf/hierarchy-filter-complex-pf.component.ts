import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

export interface FlatItems  {label: string; value: string; parentLabel: string; }

@Component({
  selector: 'app-hierarchy-filter-complex-pf',
  templateUrl: './hierarchy-filter-complex-pf.component.html',
  styleUrls: ['./hierarchy-filter-complex-pf.component.scss']
})
export class HierarchyFilterComplexPfComponent implements OnInit {

  items: MenuItem[];
  itemsFlat: FlatItems[];
  selectedItem: FlatItems;
  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'Consulting',
        items: [
          {
            label: 'Digital Business Platforms Consulting'
          }]
      },
      {
        label: 'Analytics ',
        items: [
          { label: 'Analytics Advisory' }
        ]
      }
    ];

    this.itemsFlat = [
      {label: 'Consolting', value: '', parentLabel : 'root'},
      {label: 'Digital Business Platforms Consulting', value: '', parentLabel : 'Consulting'},
      {label: 'Analytics', value: '', parentLabel : 'root'},
      {label: 'Analytics Advisory', value: '', parentLabel : 'Analytics'},

    ];
  }


}
