import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private serverUrl = environment.serverUrl+'api/User/authenticate'
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient) { }

  login(params: Login): Observable<User> {
    return this.http.post<User>(this.serverUrl, params, this.httpOptions).pipe(
      catchError(this.handleError<User>('addCustomer'))
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
