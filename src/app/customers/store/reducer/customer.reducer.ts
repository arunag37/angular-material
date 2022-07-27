import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from 'src/app/models/customers';
import * as CustomerActions from '../action/customer.actions';

export const customerFeatureKey = 'customer';

export interface CustomerState {
  [x: string]: any;
  customers: Customer[];
  loading :boolean;
}


export const initialState: CustomerState = {
  customers: [],
  loading:false
};

export const customerReducer  = createReducer(
  initialState,
  on(CustomerActions.loadingCustomers, (state) => ({ ...state ,loading:true})),
  on(CustomerActions.loadCustomersSuccess,
    (state : CustomerState ,{response :customers}) =>
      ({ ...state, customers:customers, loading:false })),

  on(CustomerActions.createCustomer, (state: CustomerState, {param}) => ({ ...state ,loading:true})),
  on(CustomerActions.createCustomerSuccess,
    (state: CustomerState, {customer}) =>
      ({...state,customers: [...state.customers, customer] ,loading:false})),

  on(CustomerActions.removeCustomer, (state: CustomerState, {param}) => ({ ...state ,loading:true})),
  on(CustomerActions.removeCustomerSuccess,
    (state : CustomerState ,{deletedId}) =>
      ({ ...state, customers: state.customers.filter( item => item.id !== deletedId) ,loading:false})),

  on(CustomerActions.updateCustomerStatus, (state: CustomerState,{modifiedCustomer,status}) => ({ ...state ,loading:true})),
  on(CustomerActions.updateCustomerStatusSuccess,
    (state : CustomerState ,{modifiedCustomer}) =>
    ({...state,
      customers: [...state.customers.filter( item => item.id !== modifiedCustomer.id), modifiedCustomer],
      loading:false
  })),
);

export function reducer(state: CustomerState | undefined, action: Action): any {
    return customerReducer(state, action);
}