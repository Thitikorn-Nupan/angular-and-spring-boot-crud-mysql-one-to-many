import {Component, NgZone, OnInit} from '@angular/core';
import {HttpService} from "../../service/http.service";
import {Employee} from "../../entities/employee";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-employee-form-edit',
  templateUrl: './employee-form-edit.component.html',
  styleUrls: ['./employee-form-edit.component.css']
})
export class EmployeeFormEditComponent implements OnInit {
  private _title: string = "Edit employee"
  private eid: number // for parameter on url
  private readonly httpService: HttpService
  // for redirect to path /lists
  private readonly ngZone: NgZone
  private readonly router: Router
  private readonly employee: Employee
  private readonly activatedRoute: ActivatedRoute // for retrieve params on path that sent by get method

  constructor(httpService: HttpService, activatedRoute: ActivatedRoute, ngZone: NgZone, router: Router) {
    this.employee = new Employee('', 0, '', 0, null);
    this.httpService = httpService;
    this.activatedRoute = activatedRoute;
    this.eid = 0
    this.ngZone = ngZone
    this.router = router
  }

  ngOnInit() {
    this.httpService.readEmployee(Number(this.activatedRoute.snapshot.paramMap.get("eid"))).subscribe((response: any) => {
      this.eid = response._eid
      this.employee._fullname = response._fullname
      this.employee._age = response._age
      this.employee._position = response._position
      this.employee._salary = response._salary
    })
  }

  public getEmployee(): Employee {
    return this.employee
  }

  get title(): string {
    return this._title;
  }

  updateEmployee(formEmployeeEdit: any) {
    if (formEmployeeEdit.confirm == true) {
      this.employee._fullname = formEmployeeEdit.fullname
      this.employee._age = formEmployeeEdit.age
      this.employee._position = formEmployeeEdit.position
      this.employee._salary = formEmployeeEdit.salary
      this.httpService.updateEmployee(this.eid, this.employee).subscribe((response: any) => {
        if (response) {
          this.ngZone.run(() => {
            this.router.navigateByUrl('employee/list')
          })
        }
      })
    } else {
      console.log('can\'t update')
    }
  }

}
