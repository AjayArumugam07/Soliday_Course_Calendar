import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'student-card-calendar',
  templateUrl: './student-card-calendar.component.html',
  styleUrls: ['./student-card-calendar.component.css']
})
export class StudentCardCalendarComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute) { }

    @Input() title: string = 'Untitled';
    @Input() accessCode: string = 'Untitled';
    @Input() teacherID: string = 'Untitled';



    onViewCourseClick() {
        this.router.navigate(['viewCourse', this.title, this.accessCode, this.teacherID], { relativeTo: this.route });
    }

    ngOnInit() {
    }



}
