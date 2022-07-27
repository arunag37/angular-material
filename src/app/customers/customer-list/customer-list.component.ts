import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource} from '@angular/material/table';
import { Customer} from 'src/app/models/customers';
import { MatSort, Sort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteDialogConfirmationComponent } from 'src/app/shared/delete-dialog-confirmation/delete-dialog-confirmation.component';
import { MatSnackBar} from '@angular/material/snack-bar';
import { CustomerNewComponent } from '../customer-new/customer-new.component';
import { CustomerInfoComponent } from '../customer-info/customer-info.component';
import {selectAllCustomers, selectTotalCustomers,selectCustomerById, getLoadingStatus} from '../store/selector/customer.selectors';
import { CustomerState} from '../store/reducer/customer.reducer';
import { select, Store} from '@ngrx/store';
import { loadingCustomers, removeCustomer, updateCustomerStatus } from '../store/action/customer.actions';
import { Status } from 'src/app/models/status';
import { ProgressSpinnerDialogComponent } from "src/app/shared/progress-spinner-dialog/progress-spinner-dialog.component";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements AfterViewInit,OnInit {
  public dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['firstName', 'gender','address', 'dob','email' ,'phoneNo','isActive','details','delete'];
  statuses: Status[] = [
    {value: true, viewValue: 'Active'},
    {value: false, viewValue: 'InActive'},
  ];

  customerCount :number =0;
  customers: Customer[] | undefined;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogConfig: MatDialogConfig<any> | undefined;
  updatedCustomer: Customer | undefined ;

  constructor (private dialog: MatDialog,private _snackBar: MatSnackBar,private store: Store<CustomerState>) {
    this.dataSource=new MatTableDataSource(this.customers);
  }

  ngAfterViewInit() {
    this.loadCustomers();
  }

  public ngOnInit(): void {
    this.loadCustomerCount();
    this.showProgressbar();
  }

  showProgressbar() :void {
    this.store.pipe(select(getLoadingStatus))
    .subscribe((loadingStatus) =>
    {
      console.log("loading : "+ loadingStatus);
      if(loadingStatus==true) {
        this.dialog.open(ProgressSpinnerDialogComponent, {
          data: loadingStatus,
          panelClass: 'transparent',
        });
      }
      else {
        this.dialog.closeAll();
      }
    }
    )
  }

  loadCustomers() {
    this.store.dispatch(loadingCustomers());
    this.store.pipe(select(selectAllCustomers))
    .subscribe((customers) =>{
      this.dataSource = new MatTableDataSource(customers),
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadCustomerCount() {
    this.store.pipe(select(selectTotalCustomers))
    .subscribe((custCount) =>{this.customerCount =custCount});
  }

  doFilter(target :any) :void{
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  redirectToDetails(id :number):void {

    this.store.pipe(select(selectCustomerById(id)))
    .subscribe((customer) =>
    this.dialog.open(CustomerInfoComponent, {
      data: customer,
      width:"35%"
    }));
  }

  redirectToDelete(item :Customer):void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    const dialogRef = this.dialog.open(DeleteDialogConfirmationComponent, this.dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {if(data===true){
        this.deleteCustomer(item);

      }}
    );
  }

  deleteCustomer(customer :Customer): void {

     this.store.dispatch(removeCustomer(customer));
     this._snackBar.open('Customer Deleted Successfully', 'Ok');
  }

  newCustomer(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(CustomerNewComponent,{
      width:"50%"
    });
    dialogRef.afterClosed().subscribe(x => {
    });

  }

  statusChange(selectedCustomer :Customer,status : boolean) :void {
    console.log("asdfghj");
    this.store.dispatch(updateCustomerStatus({modifiedCustomer:selectedCustomer,status:status}));

  }

}
