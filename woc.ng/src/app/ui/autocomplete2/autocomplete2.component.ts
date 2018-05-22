import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { KeyValue } from '../../shared/models/key-value';

@Component({
  selector: 'app-autocomplete2',
  templateUrl: './autocomplete2.component.html',
  styleUrls: ['./autocomplete2.component.scss']
})
export class Autocomplete2Component implements OnInit {
  @Input() selectedItems: KeyValue[];
  @Input() lookupData: KeyValue[];
  @Output() selectedItemsChanged = new EventEmitter<KeyValue[]>();

  filteredData: KeyValue[];
  dropdownIsVisible: boolean;

  constructor() {
    this.dropdownIsVisible = false;
   }

  ngOnInit() {
    // this.filteredData = this.data.slice();
    if (!this.selectedItems) {
      this.selectedItems = [];
    }
  }

  onAddItemButton() {
    this.dropdownIsVisible = true;
  }

  onRemove(item: KeyValue) {
    const foundIndex = this.selectedItems.findIndex(d => d.key === item.key);
    if (foundIndex > -1) {
      this.selectedItems.splice(foundIndex, 1);
      this.selectedItemsChanged.emit(this.selectedItems);
    }
    this.dropdownIsVisible = false;
  }

  onItemClick(item: KeyValue) {
    const found = this.selectedItems.find(d => d.key === item.key);
    if (!found) {
      this.selectedItems.push(item);
      this.selectedItemsChanged.emit(this.selectedItems);
    }
    this.dropdownIsVisible = false;
  }
}
