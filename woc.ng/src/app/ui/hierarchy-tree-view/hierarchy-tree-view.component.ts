import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { KeyValueNode } from '../../shared/models/key-value-node';

@Component({
  selector: 'app-hierarchy-tree-view',
  templateUrl: './hierarchy-tree-view.component.html',
  styleUrls: ['./hierarchy-tree-view.component.scss']
})
export class HierarchyTreeViewComponent implements OnInit {
  @Input() selectedItems: KeyValueNode[];
  @Input() lookupData: KeyValueNode;
  @Output() selectedItemsChanged = new EventEmitter<KeyValueNode[]>();

  dropdownIsVisible: boolean;

  constructor() {
    this.dropdownIsVisible = false;
  }

  ngOnInit() {
  }

  onAddItemButton() {
    this.dropdownIsVisible = true;
    if (!this.selectedItems) {
      this.selectedItems = [];
    }
  }

  onRemove(item: KeyValueNode) {
    const foundIndex = this.selectedItems.findIndex(d => d.key === item.key);
    if (foundIndex > -1) {
      this.selectedItems.splice(foundIndex, 1);
      this.selectedItemsChanged.emit(this.selectedItems);
    }
    this.dropdownIsVisible = false;
  }

  onItemClicked(item: KeyValueNode) {
    const found = this.selectedItems.find(d => d.key === item.key);
    if (!found) {
      this.selectedItems.push(item);
      this.selectedItemsChanged.emit(this.selectedItems);
    }
    this.dropdownIsVisible = false;
  }

  renderNode(node: KeyValueNode) {
    return JSON.stringify(node).toString();
  }


}
