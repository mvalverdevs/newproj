import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string;
  text: string;
}

@Component({
  selector: 'app-yesno',
  templateUrl: './yesno.component.html',
  styleUrls: ['./yesno.component.scss']
})
export class YesNoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<YesNoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}


  ngOnInit() {
  }

}
