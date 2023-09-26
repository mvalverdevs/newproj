import { Component, Inject } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

export interface DialogData {
  title: string;
  text: string;
}

@Component({
  selector: 'app-dialog-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.scss'],
  standalone: true,
  imports: [
      MatDialogModule,
      MatInputModule,
      MatButtonModule,
      FlexModule,
  ],
})
export class DescriptionDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DescriptionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
