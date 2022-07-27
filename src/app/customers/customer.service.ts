import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer } from '../models/customers';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private serverUrl = environment.serverUrl+'api/customer'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient) { }

  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.serverUrl)
    .pipe(
      catchError(this.handleError<Customer[]>('getCustomers', []))
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


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instea

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
