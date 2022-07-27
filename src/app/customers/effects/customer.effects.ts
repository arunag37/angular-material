import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { loadingCustomers ,loadCustomersSuccess,createCustomer,createCustomerSuccess, removeCustomer, removeCustomerSuccess,updateCustomerStatus, updateCustomerStatusSuccess} from '../store/action/customer.actions';
import { CustomerService } from '../customer.service';
import { map, mergeMap, catchError,exhaustMap, tap, switchMap } from 'rxjs/operators';

@Injectable()
export class CustomerEffects {

  loadCustomers$ = createEffect(() =>
  this.actions$.pipe(
     ofType(loadingCustomers),
     mergeMap(() => this.customerservice.getAllCustomers()
      .pipe(
        map(customers => loadCustomersSuccess({response : customers}))
        )
      )
    )
  );

  createCustomer$ = createEffect(() =>
  this.actions$.pipe(
     ofType(createCustomer),
     mergeMap(({param}) => this.customerservice.createCustomer(param)
      .pipe(
        map(savedCustomer => createCustomerSuccess({customer : savedCustomer})),
        )
      )
    )
  );

  deleteCustomer$ = createEffect(() =>
  this.actions$.pipe(
     ofType(removeCustomer),
     mergeMap(({param}) => this.customerservice.deleteCustomer(param)
      .pipe(
        map(response => removeCustomerSuccess(response) ),
        )
      )
    )
  );

  updateCustomerStatus$ = createEffect(() =>
  this.actions$.pipe(
     ofType(updateCustomerStatus),
     mergeMap(({modifiedCustomer,status}) => this.customerservice.updateCustomerStatus(modifiedCustomer,status)
      .pipe(
        map(response => updateCustomerStatusSuccess(response) ),
        )
      )
    )
  );


  constructor(private actions$: Actions ,private customerservice : CustomerService) {}


}
