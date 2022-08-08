import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { User } from '../../models/user';
import { Login } from 'src/app/models/login';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userLogin: any =undefined ;
  constructor(private authService : AuthService, private router: Router, private route: ActivatedRoute,) { }
  loginParams :any;
  ngOnInit(): void {
  }

  form: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.maxLength(60)]),
    password: new FormControl('',[Validators.required, Validators.maxLength(60)]),
  });

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.loginParams =  {
        userName : this.form.value.username as string,
        password : this.form.value.password as string
      }
      this.authService.login(this.form.value);


    }
  }

}
