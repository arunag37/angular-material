import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Customer } from 'src/app/models/customers';

@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {

  longText :string ="Sample text";
  constructor(@Inject(MAT_DIALOG_DATA) public custData: Customer) {}

  ngOnInit(): void {
    console.log(this.custData);
  }

}
