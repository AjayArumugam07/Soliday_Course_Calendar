import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'card-calendar',
  templateUrl: './card-calendar.component.html',
  styleUrls: ['./card-calendar.component.css']
})
export class CardCalendarComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute) { }

    @Input() title: string = 'Untitled';
    @Input() accessCode: string = 'Untitled';

    onAddCalendarClick() {
        this.router.navigate(['editCalendar', this.title, this.accessCode], { relativeTo: this.route });
    }

  ngOnInit() {
  }

}
