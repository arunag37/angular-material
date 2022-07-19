import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Customer, customerData} from 'src/app/models/customers';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements OnInit {

  customer: any ;
  maxDate: Date;
  customerForm = new FormGroup({
    firstName:  new FormControl('', [Validators.required, Validators.maxLength(60)]),
    lastName:  new FormControl('', [ Validators.maxLength(60)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(400)]),
    dob:new FormControl(new Date(),[Validators.required]),
    gender:  new FormControl('male', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")])
  });
  constructor(private _snackBar: MatSnackBar,  private dialogRef: MatDialogRef<CustomerNewComponent>) {
    this.maxDate = new Date();
  }
  ngOnInit(): void {
  }

  saveCustomer():void{
    if (this.customerForm.valid) {
      this.customer = {
        id : Math.max.apply(Math, customerData.map(function(o) {
          return o.id+1;
      })),
        firstName: this.customerForm.value.firstName as string,
        lastName: this.customerForm.value.lastName as string,
        dob: this.customerForm.value.dob as Date,
        gender: this.customerForm.value.gender as string,
        email: this.customerForm.value.email as string,
        phoneNo: this.customerForm.value.phoneNo ,
        address: this.customerForm.value.address as string
      }
      customerData.push(this.customer);
      this.customerForm.reset();
      this.dialogRef.close();
      this._snackBar.open('New Customer Added', 'Ok');
    }
  }

  resetForm():void {
    this.customerForm.reset();
    this.customerForm.get('gender')!.patchValue('male');
    this.customerForm.get('dob')!.patchValue(new Date());
  }

  validateControl = (controlName: string) => {
    if (this.customerForm.get(controlName)?.invalid )
      return true;

    return false;
  }

  hasError = (controlName: string, errorName: string) => {
    if (this.customerForm.get(controlName)?.hasError(errorName))
      return true;

    return false;
  }

}
