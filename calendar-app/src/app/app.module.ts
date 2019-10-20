import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EventsForDayComponent } from './events-for-day/events-for-day.component';
import { HomeworkComponent } from './homework/homework.component';
import { EventInputComponent } from './events-for-day/event-input/event-input.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsForDayComponent,
    HomeworkComponent,
    EventInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
