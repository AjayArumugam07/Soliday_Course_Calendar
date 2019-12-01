import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.component.html',
  styleUrls: ['./join-course.component.css']
})
export class JoinCourseComponent implements OnInit {

    joinCourseForm: FormGroup;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<JoinCourseComponent>) { }

    ngOnInit() {
        this.joinCourseForm = this.fb.group({
            'courseID': this.fb.control(null),
            'accessCode': this.fb.control(null)
        })

    }

    onJoinCourse(courseInformationData) {

        this.dialogRef.close(courseInformationData);
    }

}
