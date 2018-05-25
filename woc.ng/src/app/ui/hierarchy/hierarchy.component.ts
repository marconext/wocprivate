import { Component, OnInit, Input } from '@angular/core';
import { KeyValueNode } from '../../shared/models/key-value-node';
import { KeyNameItem, KeyNameHierarchyHelperService } from '../../shared/services/key-name-hierarchy-helper.service';

@Component({
  selector: 'app-hierarchy',
  templateUrl: './hierarchy.component.html',
  styleUrls: ['./hierarchy.component.scss']
})
export class HierarchyComponent implements OnInit {

  @Input() node: KeyValueNode;

  constructor(public keyNameHierarchyHelperService: KeyNameHierarchyHelperService) { }

  ngOnInit() {
  }

}
