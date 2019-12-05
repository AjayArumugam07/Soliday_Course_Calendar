import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-join-course',
  templateUrl: './join-course.component.html',
  styleUrls: ['./join-course.component.css']
})
export class JoinCourseComponent implements OnInit {

    joinCourseForm: FormGroup;
    error: string = null;

    constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<JoinCourseComponent>, private http: HttpClient, private authService: AuthService) { }

    ngOnInit() {
        this.joinCourseForm = this.fb.group({
            'teacherID': this.fb.control(null),
            'accessCode': this.fb.control(null),
            'title': this.fb.control(null)
        })

    }

    onJoinCourse(courseInformationData) {
        this.http.get<{title: string}>('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + this.joinCourseForm.value.teacherID + '/accessCode/' + this.joinCourseForm.value.accessCode + '/.json?auth=' + this.authService.currentUser.token)
            .subscribe(resData => {
                if (resData != null) {
                    courseInformationData.title = resData.title;
                    this.dialogRef.close(courseInformationData);
                } else {
                    this.error = 'invalid teacherID or acccessCode'
                }
            })

    }

}
