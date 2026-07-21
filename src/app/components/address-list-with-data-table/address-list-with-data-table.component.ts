import {Component, NgZone, OnInit} from '@angular/core';
import {HttpService} from "../../service/http.service";
import {Address} from "../../entities/address";
import {Router} from "@angular/router";

@Component({
  selector: 'app-address-list-with-data-table',
  templateUrl: './address-list-with-data-table.component.html',
  styleUrls: ['./address-list-with-data-table.component.css']
})
export class AddressListWithDataTableComponent implements OnInit {

  protected declare addresses: Array<Address>;
  protected declare addressesKey: Array<string>;

  constructor(private readonly httpService: HttpService, private readonly ngZone: NgZone, private readonly router: Router) {
  }

  ngOnInit(): void {
    this.httpService.readsAddresses().subscribe((response: Address[]) => {
      this.addresses = response
      // console.log(this.employees)
      for (const address of this.addresses) {
        this.addressesKey = Object.keys(address)
        // console.log(this.employeesKey)
      }
    })
  }

  protected setDataEdit($event: any): void {
    // console.log($event)
    const aid = $event._aid
    this.ngZone.run(() => this.router.navigateByUrl('address/editing/' + aid))
  }

  protected setDataRemove($event: any): void {
    const aid = $event._aid
    if (window.confirm('Are you sure for cleaning address id ' + aid + ' ?')) { // if true
      this.httpService.deleteAddress(aid).subscribe((response: any) => {
        if (response.data == false) {
          window.confirm('Can not delete. because address id ' + aid + ' have had some address')
        } else {
          const index = this.addresses.findIndex(address => address.aid === aid); // find index in your array
          this.addresses.splice(index, 1); // remove element from array
        }
      })
    }
  }

}
