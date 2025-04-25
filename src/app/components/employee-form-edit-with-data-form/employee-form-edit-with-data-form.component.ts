import {AfterViewChecked, ChangeDetectorRef, Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InputDynamicFiled} from "../../entities/input-dynamic-filed";
import {HttpService} from "../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../entities/address";
import {Employee} from "../../entities/employee";
import {DataFormComponent} from "../data-form/data-form.component";

@Component({
  selector: 'app-employee-form-edit-with-data-form',
  templateUrl: './employee-form-edit-with-data-form.component.html',
  styleUrls: ['./employee-form-edit-with-data-form.component.css']
})
export class EmployeeFormEditWithDataFormComponent implements OnInit, AfterViewChecked {

  // @ViewChild(DataFormComponent,{static: false})
  // public DataFormComponent! : DataFormComponent;
  protected declare titleFormMain: string
  protected declare formGroupMain: FormGroup
  protected declare inputDynamicFieldsMain: InputDynamicFiled[]
  protected declare currentRadioValue: string
  private declare eid: number

  constructor(private httpService: HttpService, private ngZone: NgZone, private router: Router, private activatedRoute: ActivatedRoute, private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges() // fix  Expression has changed after it was checked. Previous value for 'ng-valid': 'true'. Current value: 'false'.

  }

  ngOnInit(): void {
    this.eid = Number(this.activatedRoute.snapshot.paramMap.get("eid"))
    this.httpService.readEmployee(this.eid).subscribe((response: Employee) => {
        console.log('response ', response)
        this.initialFormGroupMain(response)
      }
    )
  }

  private initialFormGroupMain(employee: Employee) {
    this.titleFormMain = 'Employee Form Update'
    this.formGroupMain = new FormGroup({})
    const positions = [
      {name: '', value: 'Software Engineer'},
      {name: '', value: 'Project Manager'},
      {name: '', value: 'Senior Consultant'},
      {name: '', value: 'Data Analyst'},
      {name: '', value: 'Full-Stack Developer'},
      {name: '', value: 'Backend Developer'},
      {name: '', value: 'Frontend Developer'},
    ]
    const confirm = [
      {label: 'Confirm', value: true}, // if true will add new form
    ]
    this.inputDynamicFieldsMain = []
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('text', 'fullname', 'em-fullname-id', 'Put the fullname...', 'fullname', new FormControl(employee._fullname, Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('number', 'age', 'em-age-id', 'Put the age...', 'age', new FormControl(employee._age, Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('radio', 'position', 'em-position-id', '', 'position', new FormControl('', Validators.required)).setRadioButtonMode(true).setDataRadioButton(positions).setNameRadioButton('Position : '))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('number', 'salary', 'em-salary-id', 'Put the salary...', 'salary', new FormControl(employee._salary, Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('checkbox', 'confirm', 'em-confirm-id', '', 'confirm', new FormControl(false, Validators.required)).setCheckboxMode(true).setDataCheckbox(confirm))
    this.currentRadioValue = employee._position
  }

  protected setFormGroupMain($event: FormGroup): void {
    this.formGroupMain = $event
    const employee = new Employee(this.formGroupMain.value.fullname, this.formGroupMain.value.age, this.formGroupMain.value.position, this.formGroupMain.value.salary, null);
    if (this.formGroupMain.value.confirm) {
      this.httpService.updateEmployee(this.eid, employee).subscribe((response: any) => {
        console.log('response ', response)
        this.ngZone.run(() => {
          this.router.navigateByUrl('employee/list')
        })
      })
    }
  }
}
