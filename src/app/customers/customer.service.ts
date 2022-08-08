import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customers';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CustomerPage } from '../models/customerPage';
import { CustomerParams } from '../models/customer-params';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private serverUrl = environment.serverUrl+'api/customer'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient) { }

  getAllCustomers(param :CustomerParams): Observable<CustomerPage> {
    let params = new HttpParams()
    .set('pageIndex', param.pageIndex!)
    .set('pageSize',  param.pageSize!)
    .set('sortField',  param.sortField!)
    .set('sortDirection',  param.sortDirection!);
    if (param.filter) params = params.set('searchKey', param.filter);
    return this.http.get<CustomerPage>(this.serverUrl+'/pagination',{ params })
    .pipe(
      catchError(this.handleError<CustomerPage>('getCustomers'))
    );
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.serverUrl, customer, this.httpOptions).pipe(
      catchError(this.handleError<Customer>('addCustomer'))
    );
  }

  deleteCustomer(customer: Customer): Observable<number> {
    return this.http.delete<number>(this.serverUrl+'/'+customer.id)
  }

  updateCustomerStatus(customer: Customer,status:boolean): Observable<Customer> {
    return this.http.patch<Customer>(this.serverUrl+'/'+customer.id,status)
  }

  updateCustomerDetails(id:number,customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(this.serverUrl+'/'+id, customer, this.httpOptions).pipe(
      catchError(this.handleError<Customer>('updateCustomer'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instea

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
