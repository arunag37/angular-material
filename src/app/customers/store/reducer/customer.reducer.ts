import { Action, createReducer, on } from '@ngrx/store';
import { Customer } from 'src/app/models/customers';
import * as CustomerActions from '../action/customer.actions';

export const customerFeatureKey = 'customer';

export interface CustomerState {
  [x: string]: any;
  customers: Customer[];
  loading :boolean;
  customerCount: number;
}


export const initialState: CustomerState = {
  customers: [],
  loading:false,
  customerCount:0
};

export const customerReducer  = createReducer(
  initialState,
  on(CustomerActions.loadingCustomers, (state, {param}) => ({ ...state ,loading:true})),
  on(CustomerActions.loadCustomersSuccess,
    (state : CustomerState ,{response :customers}) =>
      ({ ...state, customers:customers.data, loading:false ,customerCount:customers.totalRecords})),

  on(CustomerActions.createCustomer, (state: CustomerState, {param}) => ({ ...state ,loading:true})),
  on(CustomerActions.createCustomerSuccess,
    (state: CustomerState, {customer}) =>
      ({...state,customers: [...state.customers, customer] ,loading:false,customerCount :state.customerCount+1})),

  on(CustomerActions.removeCustomer, (state: CustomerState, {param}) => ({ ...state ,loading:true})),
  on(CustomerActions.removeCustomerSuccess,
    (state : CustomerState ,{deletedId}) =>
      ({ ...state, customers: state.customers.filter( item => item.id !== deletedId) ,loading:false,customerCount :state.customerCount-1})),

  on(CustomerActions.updateCustomerStatus, (state: CustomerState,{modifiedCustomer,status}) => ({ ...state ,loading:true})),
  on(CustomerActions.updateCustomerStatusSuccess,
    (state : CustomerState ,{modifiedCustomer}) =>
    ({...state,
      customers: [...state.customers.filter( item => item.id !== modifiedCustomer.id), modifiedCustomer],
      loading:false
  })),
  on(CustomerActions.updateCustomerDetails, (state: CustomerState, {id,modifiedCustomer}) => ({ ...state ,loading:true})),
  on(CustomerActions.updateCustomerDetailsSuccess,
    (state: CustomerState, {modifiedCustomer}) =>
      ({...state,customers:  [...state.customers.filter( item => item.id !== modifiedCustomer.id), modifiedCustomer] ,loading:false})),
);

export function reducer(state: CustomerState | undefined, action: Action): any {
    return customerReducer(state, action);
}
