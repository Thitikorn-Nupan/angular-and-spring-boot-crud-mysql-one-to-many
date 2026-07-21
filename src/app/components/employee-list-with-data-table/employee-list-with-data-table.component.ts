import {Component, NgZone, OnInit} from '@angular/core';
import {Employee} from "../../entities/employee";
import {HttpService} from "../../service/http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-list-with-data-table',
  templateUrl: './employee-list-with-data-table.component.html',
  styleUrls: ['./employee-list-with-data-table.component.css']
})
export class EmployeeListWithDataTableComponent implements OnInit {

  protected declare employees: Array<Employee>;
  protected declare employeesKey: Array<string>;

  constructor(private readonly httpService: HttpService, private readonly ngZone: NgZone, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.httpService.readsEmployeesOnly().subscribe((response: Employee[]) => {
      this.employees = response
      this.employeesKey = Object.keys(this.employees[0])
    })
  }

  protected setDataEdit($event: any): void {
    const eid = $event._eid
    this.ngZone.run(() => this.router.navigateByUrl('employee/editing/' + eid))
  }

  protected setDataRemove($event: any): void {
    const eid = $event._eid
    if (window.confirm('Are you sure for cleaning employee id ' + eid + ' ?')) { // if true
      this.httpService.deleteEmployee(eid).subscribe((response: any) => {
        if (response.data == false) {
          window.confirm('Can not delete. because employee id ' + eid + ' have had some address')
        } else {
          /**
           splice() method changes the content of an array, and syntax
           array.splice(index, howMany, [element1][, ..., elementN]);
           index − Index at which to start changing the array.
           howMany - An integer indicating the number of old array elements to remove. If howMany is 0, no elements are removed.
          */
          const index = this.employees.findIndex(employee => employee.eid === eid); // find index in your array
          this.employees.splice(index, 1); // remove element from array
        }
      })
    }
  }
}
