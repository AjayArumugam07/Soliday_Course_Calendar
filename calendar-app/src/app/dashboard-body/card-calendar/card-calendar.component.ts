import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card-calendar',
  templateUrl: './card-calendar.component.html',
  styleUrls: ['./card-calendar.component.css']
})
export class CardCalendarComponent implements OnInit {

    constructor(private router: Router) { }

    onAddCalendarClick() {
        console.log("clijsdf");
        this.router.navigate(['/editCalendar'])
    }

  ngOnInit() {
  }

}
