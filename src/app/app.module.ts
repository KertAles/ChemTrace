import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShipperComponent } from './shipper/shipper.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {ReactiveFormsModule} from "@angular/forms";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ForwarderComponent } from './forwarder/forwarder.component';
import { OperatorComponent } from './operator/operator.component';
import { LocalStorageComponent } from './local-storage/local-storage.component';
@NgModule({
  declarations: [
    AppComponent,
    ShipperComponent,
    ForwarderComponent,
    OperatorComponent,
    LocalStorageComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCheckboxModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
