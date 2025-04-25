import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddressListComponent } from './components/address-list/address-list.component';
import { BothListComponent } from './components/both-list/both-list.component';
import {HttpClientModule} from "@angular/common/http";
import { EmployeeFormCreateComponent } from './components/employee-form-create/employee-form-create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EmployeeFormEditComponent } from './components/employee-form-edit/employee-form-edit.component';
import { AddressFormCreateComponent } from './components/address-form-create/address-form-create.component';
import { AddressFormEditComponent } from './components/address-form-edit/address-form-edit.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { EmployeeListWithDataTableComponent } from './components/employee-list-with-data-table/employee-list-with-data-table.component';
import { AddressListWithDataTableComponent } from './components/address-list-with-data-table/address-list-with-data-table.component';
import { DataFormComponent } from './components/data-form/data-form.component';
import { EmployeeFormCreateWithDataFormComponent } from './components/employee-form-create-with-data-form/employee-form-create-with-data-form.component';
import { AddressFormCreateWithDataFormComponent } from './components/address-form-create-with-data-form/address-form-create-with-data-form.component';
import { AddressFormEditWithDataFormComponent } from './components/address-form-edit-with-data-form/address-form-edit-with-data-form.component';
import { EmployeeFormEditWithDataFormComponent } from './components/employee-form-edit-with-data-form/employee-form-edit-with-data-form.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    AddressListComponent,
    BothListComponent,
    EmployeeFormCreateComponent,
    EmployeeFormEditComponent,
    AddressFormCreateComponent,
    AddressFormEditComponent,
    DataTableComponent,
    EmployeeListWithDataTableComponent,
    AddressListWithDataTableComponent,
    DataFormComponent,
    EmployeeFormCreateWithDataFormComponent,
    AddressFormCreateWithDataFormComponent,
    AddressFormEditWithDataFormComponent,
    EmployeeFormEditWithDataFormComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
