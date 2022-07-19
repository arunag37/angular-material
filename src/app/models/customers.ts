export interface Customer {
  id: number;
  firstName: string;
  lastName:string;
  gender: string;
  address: string;
  dob: Date;
  email:string;
  phoneNo: number;
}

export const customerData: Customer[] = [
  {id:1, firstName: 'Arun', lastName:'AG' , gender: 'Male', address: 'Trivandrum', dob: new Date(1992, 4, 2),email: 'arun@gmail.com', phoneNo:123},
  {id:2, firstName: 'Anish', lastName:'' , gender: 'Male', address: 'Trivandrum', dob: new Date(1992, 1, 13),email: '', phoneNo:123443},
  {id:3, firstName: 'Renjith', lastName:'' , gender: 'Male', address: 'Bangalore', dob: new Date(1995, 1, 22),email: 'arun@gmail.com', phoneNo:1234},
  {id:4, firstName: 'Avin', lastName:'VK' , gender: 'Male', address: 'Kochi', dob: new Date(1995, 1, 16),email: 'avin@gmail.com', phoneNo:1235},
  {id:5, firstName: 'Alex', lastName:'' , gender: 'Male', address: 'Trivandrum', dob: new Date(2020, 6, 17),email: 'tobin@gmail.com', phoneNo:122223},
  {id:6, firstName: 'Tobin', lastName:'' , gender: 'Male', address: 'Kollam', dob: new Date(2020, 11, 16),email: '', phoneNo:122223},
  {id:7, firstName: 'Vineeth', lastName:'John' , gender: 'Male', address: 'Trivandrum', dob: new Date(1995, 1, 16),email: 'vine@gmail.com', phoneNo:122223},
  {id:8, firstName: 'Subhash', lastName:'' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 12, 15),email: 'sub@gmail.com', phoneNo:9999},
  {id:9, firstName: 'Hari', lastName:'' , gender: 'Male', address: 'Trivandrum', dob: new Date(1992, 1, 10),email: 'hari@gmail.com', phoneNo:777},
  {id:10, firstName: 'Sajid', lastName:'' , gender: 'Male', address: 'Kollam', dob: new Date(1995, 1, 16),email: 'ssajid@gmail.com', phoneNo:122223},
  {id:11, firstName: 'Rahul', lastName:'' , gender: 'Male', address: 'Trivandrum', dob: new Date(2020, 7, 18),email: 'rahul@gmail.com', phoneNo:8888},
  {id:13, firstName: 'Vishnu', lastName:'MOhan' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'vishnu@gmail.com', phoneNo:9999},
  {id:14, firstName: 'Test123', lastName:'MOhan12' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'vishnu@gmail.com', phoneNo:9999},
  {id:15, firstName: 'Vishnu', lastName:'MOhan' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'Test12@gmail.com', phoneNo:9999},
  {id:16, firstName: 'Vishnu', lastName:'MOhan' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'vishnu@gmail.com', phoneNo:9999},
  {id:17, firstName: 'Test1', lastName:'' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'vishnu@gmail.com', phoneNo:9999},
  {id:18, firstName: 'Vishnu', lastName:'MOhan' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'vishnu@gmail.com', phoneNo:9999},
  {id:19, firstName: 'Test2', lastName:'MOhan' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'Test1234@gmail.com', phoneNo:12345},
  {id:20, firstName: 'Sreejith', lastName:'S' , gender: 'Male', address: 'Kollam', dob: new Date(1997, 1, 9),email: 'Sreejith@gmail.com', phoneNo:9999},
  {id:21, firstName: 'Vishnu', lastName:'MOhan' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'vishnu@gmail.com', phoneNo:9999},
  {id:22, firstName: 'Anish', lastName:'J' , gender: 'Male', address: 'Kochi', dob: new Date(1997, 1, 9),email: 'Anish@gmail.com', phoneNo:9999},
  {id:23, firstName: 'Vishnu', lastName:'MOhan' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'vishnu@gmail.com', phoneNo:9999},
  {id:24, firstName: 'Test1234', lastName:'MOhan123' , gender: 'Male', address: 'Trivandrum', dob: new Date(1997, 1, 9),email: 'Test1234@gmail.com', phoneNo:9999},



];
