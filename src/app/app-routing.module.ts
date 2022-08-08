import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren : () =>import('./customers/customer.module').then(m =>m.CustomerModule)
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/customers', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
