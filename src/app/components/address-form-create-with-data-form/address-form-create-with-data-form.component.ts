import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InputDynamicFiled} from "../../entities/input-dynamic-filed";
import {HttpService} from "../service/http.service";
import {Router} from "@angular/router";
import {Address} from "../../entities/address";

@Component({
  selector: 'app-address-form-create-with-data-form',
  templateUrl: './address-form-create-with-data-form.component.html',
  styleUrls: ['./address-form-create-with-data-form.component.css']
})
export class AddressFormCreateWithDataFormComponent implements OnInit{

  protected declare  titleFormMain : string
  protected declare  formGroupMain : FormGroup
  protected declare inputDynamicFieldsMain : InputDynamicFiled[]

  constructor(private httpService : HttpService ,private  ngZone : NgZone ,private  router : Router) {
  }

  ngOnInit(): void {
    this.initialFormGroupMain()
  }

  private initialFormGroupMain() {
    const confirm = [
      {label: 'Confirm', value: true}, // if true will add new form
    ]
    this.titleFormMain = 'Address Form Create'
    this.formGroupMain = new FormGroup({})
    this.inputDynamicFieldsMain = []
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('number', 'eid', 'ad-eid-id', 'Put the employee id...', 'eid', new FormControl(null, Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('text', 'country', 'ad-country-id', 'Put the country...', 'country', new FormControl('', Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('text', 'city', 'ad-city-id', 'Put the city...', 'city', new FormControl('', Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('textarea', 'details', 'ad-details-id', 'Put the details...', 'details', new FormControl('', Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('checkbox', 'confirm', 'ad-confirm-id', '', 'confirm', new FormControl(false, Validators.required)).setCheckboxMode(true).setDataCheckbox(confirm))
  }

  protected setFormGroupMain($event : FormGroup): void {
    this.formGroupMain = $event
    const address = new Address(this.formGroupMain.value.country,this.formGroupMain.value.city,this.formGroupMain.value.details);
    if (this.formGroupMain.value.confirm) {
      this.httpService.createAddress(address,this.formGroupMain.value.eid).subscribe(
        (response : any) => {
          console.log('response ', response)
          if (response.data == true) {
            this.ngZone.run(() => {this.router.navigateByUrl('address/list')})
          }
        })
    }
  }

}
