import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { relative } from 'path';

@Component({
  selector: 'card-calendar',
  templateUrl: './card-calendar.component.html',
  styleUrls: ['./card-calendar.component.css']
})
export class CardCalendarComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute) { }

    @Input() title: string = 'Untitled';
    @Input() lastName: string;

    onAddCalendarClick() {
        this.router.navigate(['editCalendar', this.title], { relativeTo: this.route });
    }

  ngOnInit() {
  }

}
