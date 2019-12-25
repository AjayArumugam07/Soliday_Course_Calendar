import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

    constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }



}
