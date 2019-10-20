import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'calendar-app';
  eventsForm: FormGroup;
  ngOnInit() {
    this.eventsForm = new FormGroup({
      'mondayEvents': new FormGroup({
        'classwork': new FormArray([]),
        'homework': new FormArray([])
      }),
      'tuesdayEvents': new FormGroup({
        'classwork': new FormArray([]),
        'homework': new FormArray([])
      }),
      'wednesdayEvents': new FormGroup({
        'classwork': new FormArray([]),
        'homework': new FormArray([])
      }),
      'thursdayEvents': new FormGroup({
        'classwork': new FormArray([]),
        'homework': new FormArray([])
      }),
      'fridayEvents': new FormGroup({
        'classwork': new FormArray([]),
        'homework': new FormArray([])
      })

    })
  }

  onSubmit() {

  }
}
