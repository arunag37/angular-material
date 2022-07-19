import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Customer, customerData} from 'src/app/models/customers';
import { MatSort, Sort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogConfirmationComponent } from 'src/app/shared/delete-dialog-confirmation/delete-dialog-confirmation.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import { CustomerNewComponent } from '../customer-new/customer-new.component';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements AfterViewInit {

  displayedColumns: string[] = ['firstName', 'gender','address', 'dob','email' ,'phoneNo','details','delete'];
  dataSource = new MatTableDataSource<Customer>(customerData);
  customerCount :number | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogConfig: MatDialogConfig<any> | undefined;


  constructor (private dialog: MatDialog,private _snackBar: MatSnackBar) {
    this.updateCustomerCount();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

  }

  doFilter(target :any) :void{
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  redirectToDetails(id :number):void {
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.dialog.open(CustomerInfoComponent, {
      data: customerData.filter(x =>x.id==id)[0],
      width:"35%"
    });
    console.log(customerData);

  }

  redirectToDelete(id :number):void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DeleteDialogConfirmationComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {if(data===true){
        this.deleteCustomer(id);

      }}
    );

  }
  deleteCustomer(id :number): void {
    var removeIndex = customerData.map(function(item) { return item.id; }).indexOf(id);
    if(removeIndex!=-1) {
      customerData.splice(removeIndex, 1);
      this.dataSource.data=customerData;
      this._snackBar.open('Customer Deleted Successfully', 'Ok');
      this.updateCustomerCount();
    }
  }
  newCustomer(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(CustomerNewComponent,{
      width:"50%"
    });
    dialogRef.afterClosed().subscribe(x => {
      this.dataSource.data=customerData;
      this.updateCustomerCount();
    });

  }

  updateCustomerCount() {
    this.customerCount =customerData.length;
  }

}
