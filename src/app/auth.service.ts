import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl = environment.serverUrl+'api/User';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};


  constructor(private http: HttpClient, public router: Router,private _snackBar: MatSnackBar) {}

  login(user: User) {
    return this.http
      .post<User>(`${this.serverUrl}/authenticate`, user)
      .subscribe((res: any) => {
        console.log("res");
        console.log(res);
        localStorage.setItem('access_token', res.token);
        this.currentUser = res;
        this.router.navigate(['customers']);
      },(error) => {
        console.log(error)  ;                           //Error callback
        switch (error.status) {
          case 400:      //login
            this._snackBar.open(error.error , 'Ok',{
              verticalPosition :'top',
              horizontalPosition : 'center',
              duration: 3000,
            });
              break;
          case 401:      //login
              this.router.navigate(['login']);
              break;
          }
        }
      );
  }

  getToken() : string|null{
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }


  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
