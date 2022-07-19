import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog-confirmation',
  templateUrl: './delete-dialog-confirmation.component.html',
  styleUrls: ['./delete-dialog-confirmation.component.css']
})
export class DeleteDialogConfirmationComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<DeleteDialogConfirmationComponent>) { }

  ngOnInit(): void {
  }

  sendStatus(status : boolean) : void
  {
    this.dialogRef.close( status);
  }


}
