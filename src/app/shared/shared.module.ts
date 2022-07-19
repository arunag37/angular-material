import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogConfirmationComponent } from './delete-dialog-confirmation/delete-dialog-confirmation.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from  '@angular/material/button';

@NgModule({
  declarations: [
    DeleteDialogConfirmationComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [ MatDialogModule,MatButtonModule, ]
})
export class SharedModule { }
