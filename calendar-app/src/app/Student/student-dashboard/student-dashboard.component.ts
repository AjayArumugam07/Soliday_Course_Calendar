import { Component, OnInit, ElementRef } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';
import { JoinCourseComponent } from './join-course/join-course.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {

    constructor(private elementRef: ElementRef, private dialog: MatDialog, private http: HttpClient, private authService: AuthService) { }
    courses = [];
    mondayCW = [];
    mondayHW = [];
    tuesdayCW = [];
    tuesdayHW = [];
    wednesdayCW = [];
    wednesdayHW = [];
    thursdayCW = [];
    thursdayHW = [];
    fridayCW = [];
    fridayHW = [];

    ngOnInit() {
        this.getCourses();
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'ghostwhite';
    }

    onJoinCourse() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(JoinCourseComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(resData => {
            this.http.put('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.user.value.id + '/courses/' + resData.title + '/.json?auth=' + this.authService.user.value.token,
                {
                    accessCode: resData.accessCode,
                    teacherID: resData.teacherID
                }
            ).subscribe( data => {
                this.http.post('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + resData.teacherID + '/students/' + resData.accessCode + '/.json?auth=' + this.authService.user.value.token,
                    {
                        ID: this.authService.user.value.id
                    }
                ).subscribe(resData => {
                    this.getCourses();
                })
            })
        })
    }

    getCourses() {
        return this.http.get('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.user.value.id + '/courses/.json?auth=' + this.authService.user.value.token)
            .pipe(map(resData => {
                const calendarArray = [];
                for (const key in resData) {
                    calendarArray.push({ ...resData[key], key });
                }
                return calendarArray;
            }))
            .subscribe(calendarArray => {
                this.courses = calendarArray;
            })
    };
}
