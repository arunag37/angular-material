import { Customer } from "./customers"

export interface CustomerPage {
  data: Customer[];
  firstPage: number;
  lastPage: number;
  nextPage: number;
  pageNumber: number;
  pageSize: number;
  previousPage: number;
  succeeded: boolean;
  totalPages: number;
  totalRecords: number;
}
