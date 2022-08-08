import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent} from '@angular/material/paginator';
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
import { CustomerParams } from 'src/app/models/customer-params';


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements AfterViewInit,OnInit {
  public dataSource: MatTableDataSource<Customer>;
  displayedColumns: string[] = ['id','firstName', 'gender','address', 'dob','email' ,'phoneNo','isActive','details','edit','delete'];
  statuses: Status[] = [
    {value: true, viewValue: 'Active'},
    {value: false, viewValue: 'InActive'},
  ];

  searchFilter :string ="";
  pageEvent! :PageEvent ;
  pageIndex : number  =0;
  pageSize : number  =5;
  customerCount :number =0;
  customers: Customer[] | undefined;
  sortColumn :string="id";
  sortDirection :string="asc"
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  dialogConfig: MatDialogConfig<any> | undefined;
  updatedCustomer: Customer | undefined ;
  tempCustomer! :Customer;
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
    let tempParam : CustomerParams = {
      filter: this.searchFilter,
      pageIndex :this.pageIndex+1,
      pageSize :this.pageSize,
      sortDirection : this.sortDirection,
      sortField: this.sortColumn
    }
    this.store.dispatch(loadingCustomers(tempParam));
    this.store.pipe(select(selectAllCustomers))
    .subscribe((customers) =>{
      this.dataSource = new MatTableDataSource(customers),
      this.dataSource.sort = this.sort;
    });
  }

  loadCustomerCount() {
    this.store.pipe(select(selectTotalCustomers))
    .subscribe((custCount) =>{this.customerCount =custCount});
  }

  pageChanged(event: PageEvent) {
    this.pageIndex=event.pageIndex;
    this.pageSize=event.pageSize;
    this.loadCustomers();
  }

  doFilter(target :any) :void{
    if(this.searchFilter!=target.value.trim().toLocaleLowerCase() )
    {
      this.searchFilter=target.value.trim().toLocaleLowerCase();
      this.loadCustomers();
    }
  }

  sortData(sort: Sort) {
    this.sortColumn=sort.active;
    this.sortDirection=sort.direction;
    this.loadCustomers();
  }

  redirectToDetails(id :number):void {
    this.store.pipe(select(selectCustomerById(id)))
    .subscribe((customer) => this.tempCustomer=customer
    );
    this.dialog.open(CustomerInfoComponent, {
      data: this.tempCustomer ,
      width:"35%"
    })

  }

  redirectToEdit(id :number):void {
    this.store.pipe(select(selectCustomerById(id)))
    .subscribe((customer) => this.tempCustomer=customer
    );
    console.log("sasa"),this.dialog.open(CustomerNewComponent, {
      data: {customer:this.tempCustomer , isEdit: true },
      width:"35%"
    })
  }

  redirectToDelete(item :Customer):void {
    const dialogRef = this.dialog.open(DeleteDialogConfirmationComponent);
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
    this.dialog.open(CustomerNewComponent,{
      data: {customer :[] , isEdit: false },
      width:"50%"
    });
    // dialogRef.afterClosed().subscribe(x => {
    // });

  }

  statusChange(selectedCustomer :Customer,status : boolean) :void {
    this.store.dispatch(updateCustomerStatus({modifiedCustomer:selectedCustomer,status:status}));

  }

}
