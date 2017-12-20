import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog-status',
  templateUrl: 'status.dialog.html'
})
export class StatusDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StatusDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  /**
   * No Click event
   *
   * @memberof StatusDialogComponent
   */
  onNoClick(): void {
    this.dialogRef.close();
  }
}
