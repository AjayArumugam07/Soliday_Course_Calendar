import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { JoinCourseComponent } from './join-course/join-course.component';

@Component({
  selector: 'student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

    constructor(private elementRef: ElementRef, private dialog: MatDialog) { }

    ngOnInit() {
    }


    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E8F1F2';
    }

    onJoinCourse() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(JoinCourseComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(resData => {
            console.log(resData);
        })
    }
}
