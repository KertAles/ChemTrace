import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ChemTrace';

  active_shipper = false;
  active_forwarder = false;
  active_operator = false;
  active_storage = false;

  constructor() {
  }
  activate_shipper() {
    this.active_shipper = true;
    this.active_forwarder = false;
    this.active_operator = false;
    this.active_storage = false;
  }

  activate_forwarder() {
    this.active_shipper = false;
    this.active_forwarder = true;
    this.active_operator = false;
    this.active_storage = false;
  }

  activate_operator() {
    this.active_shipper = false;
    this.active_forwarder = false;
    this.active_operator = true;
    this.active_storage = false;
  }

  activate_storage() {
    this.active_shipper = false;
    this.active_forwarder = false;
    this.active_operator = false;
    this.active_storage = true;
  }

  finish_procedure(event: any) {
    this.active_shipper = false;
    this.active_forwarder = false;
    this.active_operator = false;
    this.active_storage = false;
  }


}
