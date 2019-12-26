import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuillModule } from 'ngx-quill';


import { AppComponent } from './app.component';
import { EventsForDayComponent } from './Teacher/calendar-edit/events-for-day/events-for-day.component';
import { capitalizeFirstLetter } from 'src/Pipes/capitalizeFirstLetter.pipe';
import { CalendarEditComponent } from './Teacher/calendar-edit/calendar-edit.component';
import { HeaderComponent } from './header/header.component';
import { DashboardBodyComponent } from './Teacher/dashboard-body/dashboard-body.component';
import { Routes, RouterModule } from '@angular/router';
import { CardCalendarComponent } from './Teacher/dashboard-body/card-calendar/card-calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinnerComponent } from './Shared/loading-spinner/loading-spinner.component';
import { CreateCalendarComponent } from './Teacher/dashboard-body/create-calendar/create-calendar.component';
import { StudentDashboardComponent } from './Student/student-dashboard/student-dashboard.component';
import { JoinCourseComponent } from './Student/student-dashboard/join-course/join-course.component';
import { StudentCardCalendarComponent } from './Student/student-dashboard/student-card-calendar/student-card-calendar.component';
import { ViewCourseComponent } from './Student/view-course/view-course.component';
import { StudentEventsForDayComponent } from './Student/view-course/student-events-for-day/student-events-for-day.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './Teacher/calendar-edit/events-for-day/toolbar/toolbar.component';




@NgModule({
  declarations: [
    AppComponent,
    EventsForDayComponent,
    capitalizeFirstLetter,
    CalendarEditComponent,
    HeaderComponent,
    DashboardBodyComponent,
    CardCalendarComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    CreateCalendarComponent,
    StudentDashboardComponent,
    JoinCourseComponent,
    StudentCardCalendarComponent,
    ViewCourseComponent,
    StudentEventsForDayComponent,
    NotFoundComponent,
    HomeComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    MatDialogModule,
    MatToolbarModule,
    QuillModule.forRoot()
  ],
  providers: [],
    bootstrap: [AppComponent],
    entryComponents: [CreateCalendarComponent, JoinCourseComponent]
})
export class AppModule { }
