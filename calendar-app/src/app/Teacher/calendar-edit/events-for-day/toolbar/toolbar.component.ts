import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    constructor(private elementRef: ElementRef, private dialog: MatDialog) { }

  ngOnInit() {
  }

}
