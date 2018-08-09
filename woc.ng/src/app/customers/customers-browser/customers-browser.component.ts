import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Customer } from '../customer.model';
import { ProjectsService } from '../../projects/projects.service';

@Component({
  selector: 'app-customers-browser',
  templateUrl: './Customers-browser.component.html'
})
export class CustomersBrowserComponent implements OnInit {

  @Input() customers: Customer[];
  @Output() customerChanged = new EventEmitter<Customer>();

  filteredCustomers: Customer[] = [];
  filterText: string;

  constructor() {
    this.filteredCustomers = [];
  }

  ngOnInit() {
    if (this.customers) {
      this.filteredCustomers = this.customers;
    }
  }

  onCustomerItemClicked(customer: Customer) {
    this.customerChanged.emit(customer);
  }

  onFilterChanged(filterText: string) {
    this.filteredCustomers = this.customers.filter(c => c.name.toUpperCase().startsWith(filterText.toUpperCase()));
  }
}
