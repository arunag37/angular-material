import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';

import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerNewComponent } from './customer-new/customer-new.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule} from '@angular/material/paginator';


import {StoreModule} from '@ngrx/store';
import {customerFeatureKey, reducer} from './store/reducer/customer.reducer';
import { HttpClientModule } from '@angular/common/http'

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from  '@angular/material/icon';
import { MatSelectModule} from '@angular/material/select';
import { MatRadioModule} from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import {MatTooltipModule} from '@angular/material/tooltip';
import { EffectsModule } from '@ngrx/effects';
import { CustomerEffects } from './effects/customer.effects';
@NgModule({
  declarations: [
    CustomerListComponent,
    CustomerNewComponent,
    CustomerInfoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(customerFeatureKey, reducer),
    CustomerRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRippleModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatSnackBarModule,
    MatDividerModule,
    MatBadgeModule,
    MatTooltipModule,
    EffectsModule.forFeature([CustomerEffects]),

  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class CustomerModule { }
