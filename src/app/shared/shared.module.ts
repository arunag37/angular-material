import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogConfirmationComponent } from './delete-dialog-confirmation/delete-dialog-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from  '@angular/material/button';
import { ProgressSpinnerDialogComponent } from './progress-spinner-dialog/progress-spinner-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {OverlayModule} from '@angular/cdk/overlay'
@NgModule({
  declarations: [
    DeleteDialogConfirmationComponent,
    ProgressSpinnerDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    OverlayModule,
  ],
  exports: [ MatDialogModule,MatButtonModule, ]
})
export class SharedModule { }
