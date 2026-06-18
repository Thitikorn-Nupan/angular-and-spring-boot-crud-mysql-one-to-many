import {Component, NgZone} from '@angular/core';
import {Employee} from "../../entities/employee";
import {Address} from "../../entities/address";
import {HttpService} from "../../service/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-form-create',
  templateUrl: './employee-form-create.component.html',
  styleUrls: ['./employee-form-create.component.css']
})
export class EmployeeFormCreateComponent {

  private readonly _title = 'Create new employee'
  private readonly _title2 = 'Create new addresses'
  // for redirect to path /lists
  private readonly ngZone: NgZone
  private readonly router: Router
  // for ngIf
  private _confirmEmployee: boolean = false
  private _confirmAddress: boolean = false
  private employee!: Employee
  private readonly httpService: HttpService

  constructor(httpService: HttpService, ngZone: NgZone, router: Router) {
    this.httpService = httpService;
    this.router = router
    this.ngZone = ngZone
  }

  get title(): string {
    return this._title;
  }

  get title2(): string {
    return this._title2;
  }

  get confirmEmployee(): boolean {
    return this._confirmEmployee;
  }

  set confirmEmployee(value: boolean) {
    this._confirmEmployee = value;
  }

  get confirmAddress(): boolean {
    return this._confirmAddress;
  }

  set confirmAddress(value: boolean) {
    this._confirmAddress = value;
  }

  createEmployee(formEmployee: any): void { // not validate
    // match name of tag <input>
    this.employee = new Employee(formEmployee.fullname, formEmployee.age, formEmployee.position, formEmployee.salary, null);
    if (formEmployee.confirmEmployee) {
      // for *ngIf
      this.confirmEmployee = true
      console.log('can access address form & address form no. 1 works')
    } else {
      this.httpService.createEmployee(this.employee).subscribe((response: any) => {
        if (response) {
          this.ngZone.run(() => this.router.navigateByUrl('employee/list'))
        }
      })
      console.log('can add only employee')
    }
  }

  createAddress1(formAddresses: any): void {
    const addresses: Array<Address> = new Array<Address>() // way to create array object or : Address[] = new Array<Address>()
    const address1: Address = new Address(formAddresses.country, formAddresses.city, formAddresses.details);
    addresses.push(address1) // [0] = address
    this.employee.addresses = addresses // before it was null addresses now it was not
    if (formAddresses.confirmAddress) {
      this.confirmAddress = true
      console.log('can add employee and addresses & address form no. 2 works')
    } else {
      this.httpService.createEmployee(this.employee).subscribe((response: any) => {
        if (response) {
          this.ngZone.run(() => this.router.navigateByUrl('employee/list'))
        }
      })
      console.log('can add employee and address')
    }
  }

  createAddress2(formAddresses: any): void {
    const address2: Address = new Address(formAddresses.country, formAddresses.city, formAddresses.details);
    this.employee.addresses?.push(address2) // before it was addresses once element now it was twice
    this.httpService.createEmployee(this.employee).subscribe((response: any) => {
      if (response) {
        this.ngZone.run(() => this.router.navigateByUrl('employee/list'))
      }
    })
    console.log('can add employee and addresses')
  }

}
