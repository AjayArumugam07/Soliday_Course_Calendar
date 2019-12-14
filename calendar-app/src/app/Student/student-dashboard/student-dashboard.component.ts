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

    ngOnInit() {
        this.getCourses();
    }


    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#E8F1F2';
    }

    onJoinCourse() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;

        const dialogRef = this.dialog.open(JoinCourseComponent, dialogConfig);

        dialogRef.afterClosed().subscribe(resData => {
            this.http.put('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.currentUser.id + '/courses/' + resData.title + '/.json?auth=' + this.authService.currentUser.token,
                {
                    accessCode: resData.accessCode,
                    teacherID: resData.teacherID
                }
            ).subscribe( data => {
                this.http.post('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + resData.teacherID + '/students/' + resData.accessCode + '/.json?auth=' + this.authService.currentUser.token,
                    {
                        ID: this.authService.currentUser.id
                    }
                ).subscribe(resData => {
                    this.getCourses();
                })
            })
        })
    }

    getCourses() {
        console.log('Hello');
        console.log(this.authService.currentUser.id);
        return this.http.get('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.currentUser.id + '/courses/.json?auth=' + this.authService.currentUser.token)
            .pipe(map(resData => {
                const calendarArray = [];
                for (const key in resData) {
                    calendarArray.push({ ...resData[key], key });
                }
                console.log(calendarArray);
                return calendarArray;
            }))
            .subscribe(calendarArray => {
                this.courses = calendarArray;
                console.log(this.courses);
            })



    };
}
