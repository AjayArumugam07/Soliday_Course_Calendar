import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { EventsForDayComponent } from './calendar-edit/events-for-day/events-for-day.component';
import { capitalizeFirstLetter } from 'src/Pipes/capitalizeFirstLetter.pipe';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';
import { HeaderComponent } from './header/header.component';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsForDayComponent,
    capitalizeFirstLetter,
    CalendarEditComponent,
    HeaderComponent,
    DashboardBodyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
