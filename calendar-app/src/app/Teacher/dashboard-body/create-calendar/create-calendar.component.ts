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

    private randomNumber: string;

    ngOnInit() {
        this.randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
        this.calendarCreationForm = this.fb.group({
            'title': this.fb.control(null),
            'lastName': this.fb.control(null),
            'accessCode': this.fb.control(this.randomNumber)
        })
    }

    onCalendarCreation(calendarData) {

        this.dialogRef.close(calendarData);
    }



}
