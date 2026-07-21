import {Component, OnInit} from '@angular/core';
// import {demo} from "../../demo/for-demo";
import {HttpService} from "../../service/http.service";
import {Address} from "../../entities/address";

@Component({
  selector: 'app-address-list',
  templateUrl: './address-list.component.html',
  styleUrls: ['./address-list.component.css']
})
export class AddressListComponent implements OnInit {

  private readonly httpService: HttpService
  private addresses: Array<Address>

  constructor(httpService: HttpService) {
    this.addresses = new Array<Address>()
    this.httpService = httpService;
  }

  ngOnInit() {
    this.httpService.readsAddresses().subscribe((response: Address[]) => this.addresses = response)
  }

  getAddresses(): Address[] {
    return this.addresses
  }

  delete(aid: number, index: number): void {
    if (window.confirm('Are you sure for cleaning address id ' + aid + ' ?')) { // if true
      this.httpService.deleteAddress(aid).subscribe((response: any) => {
        if (response.data == false) {
          window.confirm('Can not delete. because address id ' + aid + ' have had some address')
        } else {
          this.addresses.splice(index, 1)
        }
      })
    }
  }

}
