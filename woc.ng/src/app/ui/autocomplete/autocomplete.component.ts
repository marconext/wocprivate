import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { KeyValue } from '../../shared/models/key-value';


@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {

  @Input() text: string;
  @Input() data: KeyValue[];
  @Output() textChanged = new EventEmitter<string>();
  @Output() selectionChanged = new EventEmitter<KeyValue>();


  filteredData: KeyValue[];
  dropdownIsVisible: boolean;

  constructor() {

    // this.data = [
    //   {key: 'adb91929-81cf-48ae-8839-e594ba8da3b6', value: 'aItem 1'},
    //   {key: '1911a603-0ed9-43b7-ae52-f1f940a68a26', value: 'aaItem 2'},
    //   {key: '8b8fa115-ffb0-4e41-9ca8-dd85ce081767', value: 'abcItem 3'},
    //   {key: '30eb44b1-d9b3-4e7a-9c5e-ab7676690da6', value: 'bcItem 4'},
    //   {key: 'f9d5ba25-5646-426a-8f3a-3046f4b10b14', value: 'cabItem 5'},
    //   {key: '5beba9ba-aaab-457b-bfcd-04679125f44a', value: 'Item 6'},
    //   {key: '214863b8-320a-44bb-ba7b-a76ff5ca3ec8', value: 'Item 7'}
    // ];
    this.text = '';
    this.dropdownIsVisible = false;
   }

  ngOnInit() {
    // this.filteredData = this.data.slice();
  }

  onChange() {
    this.filteredData = this.data.filter(d => d.value.toUpperCase().indexOf(this.text.toUpperCase()) > -1);
    // console.log(this.text);
    // console.log(JSON.stringify(this.filteredData));
    if (this.filteredData.length === 1) {
      this.text = this.filteredData[0].value;
    }
    this.dropdownIsVisible = this.filteredData.length > 1;
    console.log(this.filteredData.length > 1);
  }

  onItemClick(id: AAGUID) {
    const found = this.data.find(d => d.key === id);
    if (found) {
      this.text = found.value;
    }
    this.dropdownIsVisible = false;
  }
}
