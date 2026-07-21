import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Employee} from "../entities/employee";
import {Address} from "../entities/address";
import {environment} from "../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly EMPLOYEE_REST: string = environment.baseUrl + '/api/employee'; // my base api I build
  private readonly ADDRESS_REST: string = environment.baseUrl + '/api/address'; // my base api I build
  private readonly httpClient: HttpClient
  private httpHeaders: HttpHeaders  // use when send url + parameter !!

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  }

  readsEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.EMPLOYEE_REST + `/reads`);
  }

  readEmployee(eid: number): Observable<any> {
    return this.httpClient.get<Employee>(this.EMPLOYEE_REST + `/read/` + eid, {headers: this.httpHeaders});
  }

  readAddress(aid: number): Observable<any> {
    return this.httpClient.get<Address>(this.ADDRESS_REST + `/read/` + aid, {headers: this.httpHeaders});
  }

  updateEmployee(eid: number, employee: Employee): Observable<any> {
    return this.httpClient.put<Employee>(this.EMPLOYEE_REST + `/update/` + eid, employee, {headers: this.httpHeaders});
  }

  updateAddress(address: Address): Observable<any> {
    return this.httpClient.put<Address>(this.ADDRESS_REST + `/update`, address);
  }

  readsEmployeesOnly(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.EMPLOYEE_REST + `/reads/only`);
  }

  deleteEmployee(eid: number): Observable<any> {
    // should send header
    return this.httpClient.delete(this.EMPLOYEE_REST + `/delete/` + eid, {headers: this.httpHeaders})
  }

  deleteAddress(aid: number): Observable<any> {
    return this.httpClient.delete(this.ADDRESS_REST + `/delete/` + aid, {headers: this.httpHeaders})
  }

  createEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(this.EMPLOYEE_REST + `/create`, employee);
  }

  createAddress(address: Address, eid: number): Observable<any> {
    return this.httpClient.post(this.ADDRESS_REST + `/create/` + eid, address, {headers: this.httpHeaders});
  }

  readsAddresses(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.ADDRESS_REST + `/reads`);
  }

}
