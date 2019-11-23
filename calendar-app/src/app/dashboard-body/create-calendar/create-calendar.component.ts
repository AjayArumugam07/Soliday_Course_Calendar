import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'create-calendar',
  templateUrl: './create-calendar.component.html',
  styleUrls: ['./create-calendar.component.css']
})
export class CreateCalendarComponent implements OnInit {

    calendarCreationForm: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateCalendarComponent>) { }

    ngOnInit() {
        this.calendarCreationForm = this.fb.group({
            'title': this.fb.control(null),
            'lastName': this.fb.control(null)
        })

    }

    onCalendarCreation(calendarData) {

        this.dialogRef.close(calendarData);
    }



}
