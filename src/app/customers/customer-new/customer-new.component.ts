import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CustomerState } from '../store/reducer/customer.reducer';
import { createCustomer } from '../store/action/customer.actions';
import { selectCustomerMaxId } from '../store/selector/customer.selectors';
import { Status } from 'src/app/models/status';
@Component({
  selector: 'app-customer-new',
  templateUrl: './customer-new.component.html',
  styleUrls: ['./customer-new.component.css']
})
export class CustomerNewComponent implements  OnInit {

  statuses: Status[] = [
    {value: true, viewValue: 'Active'},
    {value: false, viewValue: 'InActive'},
  ];
  customer: any ;
  customerMaxCount :number=0;
  maxDate: Date;
  customerForm = new FormGroup({
    firstName:  new FormControl('', [Validators.required, Validators.maxLength(60)]),
    lastName:  new FormControl('', [ Validators.maxLength(60)]),
    address: new FormControl('', [Validators.required, Validators.maxLength(400)]),
    dob:new FormControl(new Date(),[Validators.required]),
    gender:  new FormControl('male', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNo: new FormControl('', [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
    isActive:new FormControl(true, [Validators.required]),
  });
  constructor(private _snackBar: MatSnackBar,  private dialogRef: MatDialogRef<CustomerNewComponent>,private store: Store<CustomerState>) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {
    this.store.pipe(select(selectCustomerMaxId))
    .subscribe((id) =>this.customerMaxCount =id);
  }

  saveCustomer():void{
    if (this.customerForm.valid) {
      this.customer = {
        id :this.customerMaxCount,
        firstName: this.customerForm.value.firstName as string,
        lastName: this.customerForm.value.lastName as string,
        dob: this.customerForm.value.dob as Date,
        gender: this.customerForm.value.gender as string,
        email: this.customerForm.value.email as string,
        phoneNo: this.customerForm.value.phoneNo as string,
        address: this.customerForm.value.address as string,
        isActive:this.customerForm.value.isActive
      }
      this.store.dispatch(createCustomer(this.customer));
      this.customerForm.reset();
      this.dialogRef.close();
      this._snackBar.open('New Customer Added', 'Ok');
    }
    else {
      console.log(this.customerForm);
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
