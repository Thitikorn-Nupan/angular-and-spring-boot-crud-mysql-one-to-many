import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Employee} from "../../entities/employee";
import {Address} from "../../entities/address";
import {environment} from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private readonly baseUrl: string = environment.baseUrl;
  private readonly EMPLOYEE_REST: string = this.baseUrl+'/api/employee'; // my base api I build
  private readonly ADDRESS_REST: string = this.baseUrl+'/api/address'; // my base api I build
  private readonly httpHeaders: HttpHeaders  // use when send url + parameter !!
  private readonly httpClient: HttpClient

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
    this.httpHeaders = new HttpHeaders().set('Content-Type', 'application/json')
  }

  public readsEmployees(): Observable<Employee[]> {
    // return json text from my rest api
    return this.httpClient.get<Employee[]>(this.EMPLOYEE_REST + `/reads`);
  }

  public readEmployee(eid: number): Observable<any> {
    // return json text from my rest api
    return this.httpClient.get<Employee>(this.EMPLOYEE_REST + `/read/` + eid);
  }

  public readAddress(aid: number): Observable<any> {
    // return json text from my rest api
    return this.httpClient.get<Address>(this.ADDRESS_REST + `/read/` + aid);
  }

  public updateEmployee(eid: number, employee: Employee): Observable<any> {
    // return json text from my rest api
    return this.httpClient.put<Employee>(this.EMPLOYEE_REST + `/update/` + eid, employee, {headers: this.httpHeaders});
  }

  public updateAddress(address: Address): Observable<any> {
    // return json text from my rest api
    return this.httpClient.put<Address>(this.ADDRESS_REST + `/update`, address);
  }

  public readsEmployeesOnly(): Observable<Employee[]> {
    // return json text from my rest api
    return this.httpClient.get<Employee[]>(this.EMPLOYEE_REST + `/reads/only`);
  }

  public deleteEmployee(eid: number): Observable<any> {
    // should send header
    return this.httpClient.delete(this.EMPLOYEE_REST + `/delete/` + eid)
  }

  public deleteAddress(aid: number): Observable<any> {
    return this.httpClient.delete(this.ADDRESS_REST + `/delete/` + aid)
  }

  public createEmployee(employee: Employee): Observable<any> {
    return this.httpClient.post(this.EMPLOYEE_REST + `/create`, employee);
  }

  public createAddress(address: Address, eid: number): Observable<any> {
    return this.httpClient.post(this.ADDRESS_REST + `/create/` + eid, address, {headers: this.httpHeaders});
  }

  public readsAddresses(): Observable<Address[]> {
    return this.httpClient.get<Address[]>(this.ADDRESS_REST + `/reads`);
  }

}
