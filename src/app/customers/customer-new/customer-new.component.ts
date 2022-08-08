import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { CustomerState } from '../store/reducer/customer.reducer';
import { createCustomer, updateCustomerDetails } from '../store/action/customer.actions';
import { selectCustomerMaxId } from '../store/selector/customer.selectors';
import { Status } from 'src/app/models/status';
import { Customer } from 'src/app/models/customers';
import { CustomerService } from '../customer.service';

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
  isEdit:boolean=false;
  customerData :Customer | undefined ;


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
  constructor (
    private _snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CustomerNewComponent>,
    private store: Store<CustomerState>,
    @Inject(MAT_DIALOG_DATA) public custData: any,
  ) {
    this.maxDate = new Date();
    this.isEdit=this.custData.isEdit;
    if(this.isEdit) {
      this.customerData=this.custData.customer;
    }
  }

  ngOnInit(): void {
    if(this.isEdit) {
      this.loadCustomerDetailsForEdit ();
    }
  }

  loadCustomerDetailsForEdit ():void{
    this.customerForm.patchValue({
      firstName: this.customerData?.firstName,
      lastName: this.customerData?.lastName,
      address: this.customerData?.address,
      dob:this.customerData?.dob,
      gender:  this.customerData?.gender.toLocaleLowerCase(),
      email: this.customerData?.email,
      phoneNo: this.customerData?.phoneNo,
      isActive:this.customerData?.isActive,
    });
  }

  submit():void{
    if (this.customerForm.valid) {
      this.customer = {
        firstName: this.customerForm.value.firstName as string,
        lastName: this.customerForm.value.lastName as string,
        dob: this.customerForm.value.dob as Date,
        gender: this.customerForm.value.gender as string,
        email: this.customerForm.value.email as string,
        phoneNo: this.customerForm.value.phoneNo as string,
        address: this.customerForm.value.address as string,
        isActive:this.customerForm.value.isActive
      }
      if(this.isEdit) {
        console.log(this.custData.customer.id);
        this.customer.Id=this.custData.customer.id;
        this.updateCustomer(this.customer);
      }
      else {
        this.saveCustomer(this.customer);
      }
      // this.dialogRef.close();
    }else {
      // alert("Form is not valid");
    }

  }

  updateCustomer(data :Customer) :void {
    this.store.dispatch(updateCustomerDetails(this.custData.customer.id,data));
    this.customerForm.reset();
    this.dialogRef.close();
    this._snackBar.open('Customer Updated', 'Ok');
  }

  saveCustomer(data :Customer) :void{
      this.store.dispatch(createCustomer(data));
      this.customerForm.reset();
      this.dialogRef.close();
      this._snackBar.open('New Customer Added', 'Ok');
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
