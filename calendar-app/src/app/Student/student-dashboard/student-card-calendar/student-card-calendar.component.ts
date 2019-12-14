import { Component, OnInit, Input } from '@angular/core';
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

    onAddCalendarClick() {
        this.router.navigate(['editCalendar', this.title, this.accessCode], { relativeTo: this.route });
    }

    ngOnInit() {
    }

}
