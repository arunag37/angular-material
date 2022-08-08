import { Action, createAction, props } from '@ngrx/store';
import { CustomerParams } from 'src/app/models/customer-params';
import { CustomerPage } from 'src/app/models/customerPage';
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
  UpdateCustomerStateSuccess ='[Customer] Update Customer Status Success',
  UpdateCustomerDetails="[Customer] Update Customer",
  UpdateCustomerDetailsSuccess = "[Customer] Update Customer Success",

}

export const loadingCustomers = createAction(
  CustomerActionType.Loading,
  (param: CustomerParams) => ({param})
);

export const loadCustomersSuccess = createAction(
  CustomerActionType.LoadCustomersSuccess,
  props<{ response: CustomerPage }>()
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

export const updateCustomerDetails = createAction(
  CustomerActionType.UpdateCustomerDetails,
 (id:number, modifiedCustomer: Customer) => ({id,modifiedCustomer})
);

export const updateCustomerDetailsSuccess = createAction(
  CustomerActionType.UpdateCustomerDetailsSuccess,
  props<{ modifiedCustomer: Customer }>()
);
