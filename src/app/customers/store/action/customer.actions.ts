import { Action, createAction, props } from '@ngrx/store';
import { CustomerParams } from 'src/app/models/customer-params';
import { Customer } from 'src/app/models/customers';


export enum CustomerActionType {
  Loading = "[Customer] Load Customers",
  LoadCustomersSuccess = "[Customer] Loaded Success",
  loadCustomersFailure = "[Customer] Loaded Failure",
  CreateCustomer="[Customer] Create Customer",
  CreateCustomerSuccess = "[Customer] Create Customer Success",
  RemoveCustomer = '[Customer] Remove Customer',
  RemoveCustomerSuccess = '[Customer] Remove Customer Success',
  UpdateCustomerState ='[Customer] Update Customer Status',
  UpdateCustomerStateSuccess ='[Customer] Update Customer Status Success'

}

export const loadingCustomers = createAction(
  CustomerActionType.Loading
);

export const loadCustomersSuccess = createAction(
  CustomerActionType.LoadCustomersSuccess,
  props<{ response: Customer[] }>()
);

export const loadCustomersFailure = createAction(
  CustomerActionType.loadCustomersFailure,
  props<{ error: any }>()
);

export const createCustomer = createAction(
  CustomerActionType.CreateCustomer,
 (param: Customer) => ({param})
);

export const createCustomerSuccess = createAction(
  CustomerActionType.CreateCustomerSuccess,
  props<{ customer: Customer }>()
);

export const removeCustomer = createAction(
  CustomerActionType.RemoveCustomer,
  (param: Customer) => ({param})
);

export const removeCustomerSuccess = createAction(
  CustomerActionType.RemoveCustomerSuccess,
  (deletedId: number) => ({deletedId})
);

export const updateCustomerStatus = createAction(
  CustomerActionType.UpdateCustomerState,
  props<{ modifiedCustomer: Customer; status: boolean }>()
);

export const updateCustomerStatusSuccess = createAction(
  CustomerActionType.UpdateCustomerStateSuccess,
  (modifiedCustomer: Customer) => ({modifiedCustomer})
);
