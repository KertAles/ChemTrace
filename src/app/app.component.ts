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

  constructor() {
  }
  activate_shipper() {
    this.active_shipper = true;
    this.active_forwarder = false;
    this.active_operator = false;
  }
  finish_shipper(event: any) {
    this.active_shipper = false;
    this.active_forwarder = false;
    this.active_operator = false;
  }

  activate_forwarder() {
    this.active_shipper = false;
    this.active_forwarder = true;
    this.active_operator = false;
  }
  finish_forwarder(event: any) {
    this.active_shipper = false;
    this.active_forwarder = false;
    this.active_operator = false;
  }

  activate_operator() {
    this.active_shipper = false;
    this.active_forwarder = false;
    this.active_operator = true;
  }
  finish_operator(event: any) {
    this.active_shipper = false;
    this.active_forwarder = false;
    this.active_operator = false;
  }


}
