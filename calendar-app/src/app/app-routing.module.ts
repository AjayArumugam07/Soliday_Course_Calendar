import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardBodyComponent } from './Teacher/dashboard-body/dashboard-body.component';
import { AuthComponent } from './auth/auth.component';
import { CalendarEditComponent } from './Teacher/calendar-edit/calendar-edit.component';
import { StudentDashboardComponent } from './Student/student-dashboard/student-dashboard.component';
import { ViewCourseComponent } from './Student/view-course/view-course.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardBodyComponent },
    { path: 'studentDashboard', component: StudentDashboardComponent },
    { path: 'auth/:mode', component: AuthComponent },
    { path: 'dashboard/editCalendar/:calendarTitle/:accessCode', component: CalendarEditComponent },
    { path: 'studentDashboard/viewCourse/:calendarTitle/:accessCode/:teacherID', component: ViewCourseComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
