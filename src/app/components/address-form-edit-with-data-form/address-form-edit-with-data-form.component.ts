import {Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {InputDynamicFiled} from "../../entities/input-dynamic-filed";
import {HttpService} from "../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../entities/address";
import { AfterViewChecked, ChangeDetectorRef } from '@angular/core'


@Component({
  selector: 'app-address-form-edit-with-data-form',
  templateUrl: './address-form-edit-with-data-form.component.html',
  styleUrls: ['./address-form-edit-with-data-form.component.css']
})
export class AddressFormEditWithDataFormComponent implements OnInit,AfterViewChecked  {

  protected declare titleFormMain: string
  protected declare formGroupMain: FormGroup
  protected declare inputDynamicFieldsMain: InputDynamicFiled[]

  constructor(private httpService: HttpService, private ngZone: NgZone, private router: Router, private activatedRoute: ActivatedRoute,private readonly changeDetectorRef: ChangeDetectorRef) {
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges() // fix  Expression has changed after it was checked. Previous value for 'ng-valid': 'true'. Current value: 'false'.

  }

  ngOnInit(): void {
    const aid = Number(this.activatedRoute.snapshot.paramMap.get("aid"))
    this.httpService.readAddress(aid).subscribe((response: Address) => {
        console.log('response ', response)
        this.initialFormGroupMain(response)
      }
    )
  }

  private initialFormGroupMain(address: Address) {
    const confirm = [
      {label: 'Confirm', value: true}, // if true will add new form
    ]
    this.titleFormMain = 'Address Form Update'
    this.formGroupMain = new FormGroup({})
    this.inputDynamicFieldsMain = []
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('text', 'country', 'ad-country-id', 'Put the country...', 'country', new FormControl(address._country, Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('text', 'city', 'ad-city-id', 'Put the city...', 'city', new FormControl(address._city, Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('textarea', 'details', 'ad-details-id', 'Put the details...', 'details', new FormControl(address._details, Validators.required)))
    this.inputDynamicFieldsMain.push(new InputDynamicFiled('checkbox', 'confirm', 'ad-confirm-id', '', 'confirm', new FormControl(false, Validators.required)).setCheckboxMode(true).setDataCheckbox(confirm))
  }

  protected setFormGroupMain($event: FormGroup): void {
    this.formGroupMain = $event
      let address = new Address(this.formGroupMain.value.country, this.formGroupMain.value.city, this.formGroupMain.value.details);
     address.aid = Number(this.activatedRoute.snapshot.paramMap.get("aid"))
    if (this.formGroupMain.value.confirm) {
      this.httpService.updateAddress(address).subscribe((response: any) => {
        console.log('response ', response)
        if (response.data == true) {
          this.ngZone.run(() => {
            this.router.navigateByUrl('address/list')
          })
        }
      })
    }
  }
}
