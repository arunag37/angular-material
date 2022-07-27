import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as customerReducer from '../reducer/customer.reducer';

export const selectCustomerState = createFeatureSelector<customerReducer.CustomerState>(
  customerReducer.customerFeatureKey,
);


export const selectAllCustomers = createSelector(
   selectCustomerState,
    (state: customerReducer.CustomerState) => state.customers
  );

  export const selectTotalCustomers = createSelector(
    selectCustomerState,
     (state: customerReducer.CustomerState) => state.customers.length
   );

   export const selectCustomerMaxId = createSelector(
    selectCustomerState,
     (state: customerReducer.CustomerState) => Math.max.apply(Math,  state.customers.map(function(o) {
      console.log("sss"+(o.id+1));
      return o.id+1;
    }))
  );

  export const selectCustomerById = (custId: number) => createSelector(
    selectCustomerState,
     (state: customerReducer.CustomerState) => state.customers.filter(x =>x.id==custId)[0]
  );

  export const getLoadingStatus = createSelector(
    selectCustomerState,
     (state: customerReducer.CustomerState) => state.loading
  );

