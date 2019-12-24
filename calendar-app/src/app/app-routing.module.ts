import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardBodyComponent } from './Teacher/dashboard-body/dashboard-body.component';
import { AuthComponent } from './auth/auth.component';
import { CalendarEditComponent } from './Teacher/calendar-edit/calendar-edit.component';
import { StudentDashboardComponent } from './Student/student-dashboard/student-dashboard.component';
import { ViewCourseComponent } from './Student/view-course/view-course.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './home/home.component';
import { StudentGuard } from './auth/student.guard';
import { TeacherGuard } from './auth/teacher.guard';
import { AuthenticatedGuard } from './auth/Authenticated.guard';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'notFound', component: NotFoundComponent },

    { path: 'auth/:mode', component: AuthComponent, canActivate: [AuthenticatedGuard] },

    { path: 'dashboard', component: DashboardBodyComponent, canActivate: [AuthGuard, TeacherGuard] },
    { path: 'dashboard/editCalendar/:calendarTitle/:accessCode', component: CalendarEditComponent, canActivate: [AuthGuard, TeacherGuard] },

    { path: 'studentDashboard', component: StudentDashboardComponent, canActivate: [AuthGuard, StudentGuard] },
    { path: 'studentDashboard/viewCourse/:calendarTitle/:accessCode/:teacherID', component: ViewCourseComponent, canActivate: [AuthGuard, StudentGuard] },
    { path: '**', redirectTo: '/notFound' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
