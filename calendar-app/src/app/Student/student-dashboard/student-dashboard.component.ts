import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

    constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E8F1F2';
    }
}
