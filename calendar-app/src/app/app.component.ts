import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'calendar-app';
  eventsForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.eventsForm = this.fb.group({
      'mondayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      }),
      'tuesdayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      }),
      'wednesdayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      }),
      'thursdayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      }),
      'fridayEvents': this.fb.group({
        'classwork': this.fb.array([]),
        'homework': this.fb.array([])
      })

    })

  //  this.eventsForm.valueChanges.subscribe(newVal => console.log(newVal))
  }

  onSubmit() {

  }

  hit() {
    console.log(this.eventsForm);
  }
}
