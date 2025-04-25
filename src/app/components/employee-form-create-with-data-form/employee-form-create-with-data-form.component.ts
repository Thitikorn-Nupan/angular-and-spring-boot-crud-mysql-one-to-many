import {Component, NgZone, OnInit} from '@angular/core';
import {InputDynamicFiled} from "../../entities/input-dynamic-filed";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";
import { Employee } from 'src/app/entities/employee';
import {Address} from "../../entities/address";

@Component({
  selector: 'employee-form-create-with-data-form',
  templateUrl: './employee-form-create-with-data-form.component.html',
  styleUrls: ['./employee-form-create-with-data-form.component.css']
})
export class EmployeeFormCreateWithDataFormComponent implements OnInit{

  private declare employee : Employee

  protected declare  titleFormMain : string
  protected declare  formGroupMain : FormGroup
  protected  declare inputDynamicFieldsMain : InputDynamicFiled[]

  protected enableFormSubMain1 : boolean = false;
  protected enableFormSubMain2 : boolean = false;

  protected declare  titleFormSubMain1 : string
  protected declare  formGroupSubMain1 : FormGroup
  protected declare inputDynamicFieldsSubMain1 : InputDynamicFiled[]

  protected declare  titleFormSubMain2 : string
  protected declare  formGroupSubMain2 : FormGroup
  protected declare inputDynamicFieldsSubMain2 : InputDynamicFiled[]

  constructor(private httpService: HttpService, private ngZone : NgZone , private  router : Router) {}

  private initialFormGroupMain() {
    this.titleFormMain = 'Employee Form Create'
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
      {label: 'Want to add the address', value: true}, // if true will add new form
    ]
    this.inputDynamicFieldsMain = []
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('text', 'fullname', 'em-fullname-id', 'Put the fullname...', 'fullname', new FormControl('', Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('number', 'age', 'em-age-id', 'Put the age...', 'age', new FormControl(null, Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('radio', 'position', 'em-position-id', '', 'position', new FormControl('', Validators.required)).setRadioButtonMode(true).setDataRadioButton(positions).setNameRadioButton('Position : '))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('number', 'salary', 'em-salary-id', 'Put the salary...', 'salary', new FormControl(null, Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('checkbox', 'confirm', 'em-confirm-id', '', 'confirm', new FormControl(false, Validators.required)).setCheckboxMode(true).setDataCheckbox(confirm))
  }

  private initialFormGroupSubMain1() {
    const confirm = [
      {label: 'Want to add more the address', value: true}, // if true will add new form
    ]
    this.titleFormSubMain1 = 'Address Form Create 1'
    this.formGroupSubMain1 = new FormGroup({})
    this.inputDynamicFieldsSubMain1 = []
    this.inputDynamicFieldsSubMain1.push(new InputDynamicFiled('number', 'eid', 'ad-eid-id', 'Put the employee id...', 'eid', new FormControl(null, Validators.required)))
    this.inputDynamicFieldsSubMain1.push(new InputDynamicFiled('text', 'country', 'ad-country-id', 'Put the country...', 'country', new FormControl('', Validators.required)))
    this.inputDynamicFieldsSubMain1.push(new InputDynamicFiled('text', 'city', 'ad-city-id', 'Put the city...', 'city', new FormControl('', Validators.required)))
    this.inputDynamicFieldsSubMain1.push(new InputDynamicFiled('textarea', 'details', 'ad-details-id', 'Put the details...', 'details', new FormControl('', Validators.required)))
    this.inputDynamicFieldsSubMain1.push(new InputDynamicFiled('checkbox', 'confirm', 'ad-confirm-id', '', 'confirm', new FormControl(false, Validators.required)).setCheckboxMode(true).setDataCheckbox(confirm))
  }

  private initialFormGroupSubMain2() {

    this.titleFormSubMain2 = 'Address Form Create 2'
    this.formGroupSubMain2 = new FormGroup({})
    this.inputDynamicFieldsSubMain2 = []
    this.inputDynamicFieldsSubMain2.push(new InputDynamicFiled('number', 'eid', 'ad2-eid-id', 'Put the employee id...', 'eid', new FormControl(null, Validators.required)))
    this.inputDynamicFieldsSubMain2.push(new InputDynamicFiled('text', 'country', 'ad2-country-id', 'Put the country...', 'country', new FormControl('', Validators.required)))
    this.inputDynamicFieldsSubMain2.push(new InputDynamicFiled('text', 'city', 'ad2-city-id', 'Put the city...', 'city', new FormControl('', Validators.required)))
    this.inputDynamicFieldsSubMain2.push(new InputDynamicFiled('textarea', 'details', 'ad2-details-id', 'Put the details...', 'details', new FormControl('', Validators.required)))
  }

  ngOnInit(): void {
    this.initialFormGroupMain()
  }

  protected setFormGroupMain($event : FormGroup): void {
    this.formGroupMain = $event
    this.employee = new Employee(this.formGroupMain.value.fullname,this.formGroupMain.value.age,this.formGroupMain.value.position,this.formGroupMain.value.salary,null);
    if (this.formGroupMain.value.confirm) {
      this.enableFormSubMain1 = true
      this.initialFormGroupSubMain1()
    } else {
      this.enableFormSubMain1 = false
      this.createEmployee();
    }
  }

  private createEmployee() {
    this.httpService.createEmployee(this.employee).subscribe(
      (response: any) => {
        console.log('response ', response)
        this.ngZone.run(() => this.router.navigateByUrl('employee/list'))
      })
  }

  protected setFormGroupSubMain1($event : FormGroup): void {
    this.formGroupSubMain1 = $event
    let addresses : Array<Address> = new Array<Address>()
    let address : Address = new Address(this.formGroupSubMain1.value.country , this.formGroupSubMain1.value.city ,this.formGroupSubMain1.value.details);
    addresses.push(address) // [0] = address
    this.employee.addresses = addresses // before it was null addresses now it was not
    if (this.formGroupSubMain1.valid) {
      this.enableFormSubMain2 = true
      this.initialFormGroupSubMain2()
    } else {
      this.createEmployee();
    }
  }

  protected setFormGroupSubMain2($event : FormGroup): void {
    this.formGroupSubMain2 = $event
    let address : Address = new Address(this.formGroupSubMain2.value.country , this.formGroupSubMain2.value.city ,this.formGroupSubMain2.value.details);
    this.employee.addresses?.push(address) // before it was addresses once element now it was twice
    if (this.formGroupSubMain2.valid) {
      this.createEmployee()
    }
  }
}
