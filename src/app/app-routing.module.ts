import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeListComponent} from "./components/employee-list/employee-list.component";
import {AddressListComponent} from "./components/address-list/address-list.component";
import {BothListComponent} from "./components/both-list/both-list.component";
import {EmployeeFormCreateComponent} from "./components/employee-form-create/employee-form-create.component";
import {EmployeeFormEditComponent} from "./components/employee-form-edit/employee-form-edit.component";
import {AddressFormCreateComponent} from "./components/address-form-create/address-form-create.component";
import {AddressFormEditComponent} from "./components/address-form-edit/address-form-edit.component";
import {
  EmployeeListWithDataTableComponent
} from "./components/employee-list-with-data-table/employee-list-with-data-table.component";
import {
  AddressListWithDataTableComponent
} from "./components/address-list-with-data-table/address-list-with-data-table.component";
import {
  EmployeeFormCreateWithDataFormComponent
} from "./components/employee-form-create-with-data-form/employee-form-create-with-data-form.component";
import {
  AddressFormCreateWithDataFormComponent
} from "./components/address-form-create-with-data-form/address-form-create-with-data-form.component";
import {
  AddressFormEditWithDataFormComponent
} from "./components/address-form-edit-with-data-form/address-form-edit-with-data-form.component";
import {
  EmployeeFormEditWithDataFormComponent
} from "./components/employee-form-edit-with-data-form/employee-form-edit-with-data-form.component";

const routes: Routes = [
  {path:'both/list' , component:BothListComponent},
  // {path:'employee/list' , component:EmployeeListComponent}, // old way
  {path:'employee/list' , component:EmployeeListWithDataTableComponent}, // new way
  // {path:'employee/form-create' , component:EmployeeFormCreateComponent}, // old way
  {path:'employee/form-create' , component:EmployeeFormCreateWithDataFormComponent}, // old way
  // {path:'address/form-create' , component:AddressFormCreateComponent}, // old way
  {path:'address/form-create' , component:AddressFormCreateWithDataFormComponent}, // new way
  // {path:'employee/editing/:eid' , component:EmployeeFormEditComponent},
  {path:'employee/editing/:eid' , component:EmployeeFormEditWithDataFormComponent}, // new way
  // {path:'address/editing/:aid' , component:AddressFormEditComponent}, // old way
  {path:'address/editing/:aid' , component:AddressFormEditWithDataFormComponent}, // new way
  //  {path:'address/list' , component:AddressListComponent} ,// old way
  {path:'address/list' , component:AddressListWithDataTableComponent} // old way
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
