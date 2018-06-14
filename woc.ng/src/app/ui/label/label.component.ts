import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-label',
  template: '<span class="label">{{displayText}}<i class="fa fa-close" (click)="onDelete()"></i></span>'
})
export class LabelComponent implements OnInit {
  @Input() item: any;
  @Input() textField: string;
  @Output() click = new EventEmitter<void>();

  displayText: string;

  constructor() { }

  ngOnInit() {
    if ( this.textField ) {
      this.displayText = this.item[this.textField];
    } else {
      this.displayText = this.textField;
    }
  }

  onDelete() {
    this.click.emit();
  }
}
