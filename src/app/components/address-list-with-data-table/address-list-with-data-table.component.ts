import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/http.service";
import {Address} from "../../entities/address";

@Component({
  selector: 'app-address-list-with-data-table',
  templateUrl: './address-list-with-data-table.component.html',
  styleUrls: ['./address-list-with-data-table.component.css']
})
export class AddressListWithDataTableComponent implements OnInit {

  protected declare addresses: Array<Address>;
  protected declare addressesKey: Array<string>;

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.readsAddresses().subscribe(
      (response: Address[]) => {
        this.addresses = response
        // console.log(this.employees)
        for (const address of this.addresses) {
          this.addressesKey = Object.keys(address)
          // console.log(this.employeesKey)
        }
      })
  }

  protected setDataEdit($event : any) {
    console.log($event)
  }

  protected setDataRemove($event : any) {
    const aid = $event._aid
    // console.log(aid)
    if (window.confirm('Are you sure for cleaning address id ' + aid + ' ?')) { // if true
      this.httpService.deleteAddress(aid).subscribe(
        (response: any) => {
          console.log(response)
          if (response.data == false) {
            window.confirm('Can not delete. because address id ' + aid + ' have had some address')
          } else {
            /**
             splice() method changes the content of an array, and syntax
             array.splice(index, howMany, [element1][, ..., elementN]);
             index − Index at which to start changing the array.
             howMany - An integer indicating the number of old array elements to remove. If howMany is 0, no elements are removed.
             */
            let index = this.addresses.findIndex(address => address.aid === aid); // find index in your array
            this.addresses.splice(index, 1); // remove element from array
          }
        })
    }
  }
}
