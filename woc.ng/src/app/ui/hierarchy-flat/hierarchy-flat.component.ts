import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { KeyNameItem, KeyNameHierarchyHelperService } from '../../shared/services/key-name-hierarchy-helper.service';
import { KeyValue } from '../../shared/models/key-value';

@Component({
  selector: 'app-hierarchy-flat',
  templateUrl: './hierarchy-flat.component.html',
  styleUrls: ['./hierarchy-flat.component.scss']
})
export class HierarchyFlatComponent implements OnInit {

  @Input() lookupData: KeyNameItem[];
  @Input() selectedItems: KeyNameItem[];
  @Output() selectedItemsChanged = new EventEmitter<KeyNameItem[]>();

  filteredItems: KeyNameItem[];

  searchText: string;

  showListDiv = false;

  constructor(private keyNameHierarchyHelperService: KeyNameHierarchyHelperService) {
    this.searchText = '';
    this.filteredItems = [];
    this.selectedItems = [];
    this.searchText = '';
  }

  ngOnInit() {
  }

  onFilterChanged(filterText: string) {
    if (filterText === '') {
      this.filteredItems = [];
    } else {
      this.filteredItems = this.lookupData.filter(d => d.name.toUpperCase().indexOf(filterText.toUpperCase()) > -1);
    }
    this.showListDiv = this.filteredItems.length > 0;
  }

  onItemClicked(item: KeyNameItem) {
    const found = this.selectedItems.find(d => d.keyNamePath === item.keyNamePath);
    if (!found) {
      this.selectedItems.push(item);
      this.selectedItemsChanged.emit(this.selectedItems);
    }
    this.filteredItems = [];
    this.searchText = '';
    this.showListDiv = false;
  }

  onRemoveClicked(item: KeyNameItem) {
    const foundIndex = this.selectedItems.findIndex(d => d.keyNamePath === item.keyNamePath);
    if (foundIndex > -1) {
      this.selectedItems.splice(foundIndex, 1);
      this.selectedItemsChanged.emit(this.selectedItems);
    }
    this.filteredItems = [];
    this.searchText = '';
    this.showListDiv = false;
  }

  onDropdownButtonClicked() {
    this.showListDiv = true;
    this.filteredItems = this.lookupData.slice();
  }

  getParentTree(child: KeyNameItem): KeyNameItem[] {
    const ret = this.keyNameHierarchyHelperService.getBreadCrumpArray(this.lookupData, child);
    return ret;
  }
}
