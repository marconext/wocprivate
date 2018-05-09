import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchTag } from './search-tag.model';

@Component({
  selector: 'app-search-tag-box',
  templateUrl: './search-tag-box.component.html'
})
export class SearchTagBoxComponent implements OnInit {

  @Input() searchTags: SearchTag[];

  // @Output() selectionChanged = new EventEmitter<SearchTag[]>();
  @Output() selectionasfasf = new EventEmitter<string>();

  constructor() {
    this.searchTags = [];
  }

  ngOnInit() {
  }

  onDeleteTag(keyNamePath: string) {
    // this.searchTags = this.searchTags.filter(t => t.keyNamePath !== keyNamePath);
    // this.selectionChanged.emit(this.searchTags);
    this.selectionasfasf.emit(keyNamePath);
  }
}
