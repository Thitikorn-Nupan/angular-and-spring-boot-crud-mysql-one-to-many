import {Component, NgZone, OnInit} from '@angular/core';
import {HttpService} from "../../service/http.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Address} from "../../entities/address";

@Component({
  selector: 'app-address-form-edit',
  templateUrl: './address-form-edit.component.html',
  styleUrls: ['./address-form-edit.component.css']
})
export class AddressFormEditComponent implements OnInit {
  private readonly httpService: HttpService
  private readonly activatedRoute: ActivatedRoute // for retrieve params on path that sent by get method
  private readonly _address: Address
  private _title: string = "Edit address"
  // for redirect to path /lists
  private readonly ngZone: NgZone
  private readonly router: Router

  constructor(httpService: HttpService, activatedRoute: ActivatedRoute, ngZone: NgZone, router: Router) {
    this.httpService = httpService
    this.activatedRoute = activatedRoute
    this._address = new Address('', '', '')
    this.ngZone = ngZone
    this.router = router
  }

  ngOnInit(): void {
    this.httpService.readAddress(Number(this.activatedRoute.snapshot.paramMap.get("aid"))).subscribe((response: Address) => {
      this._address.city = response._city
      this._address.country = response._country
      this._address.details = response._details
      this._address.aid = response._aid
    })
  }

  get address(): Address {
    return this._address;
  }

  get title(): string {
    return this._title;
  }

  public updateAddress(addressForm: any) {
    if (addressForm.confirm == true) {
      this._address.city = addressForm.city
      this._address.country = addressForm.country
      this._address.details = addressForm.details
      this.httpService.updateAddress(this.address).subscribe((response: any) => this.ngZone.run(() => this.router.navigateByUrl('address/list')))
    }
  }

}
