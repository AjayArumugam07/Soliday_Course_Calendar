import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'dashboard-body',
  templateUrl: './dashboard-body.component.html',
  styleUrls: ['./dashboard-body.component.css']
})
export class DashboardBodyComponent implements OnInit {
  ngOnInit() {
  }
  constructor(private elementRef: ElementRef) {

  }
  ngAfterViewInit() {
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E8F1F2';
  }
}
