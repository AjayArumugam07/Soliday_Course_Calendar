import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { EventsForDayComponent } from './events-for-day/events-for-day.component';
import { capitalizeFirstLetter } from 'src/Pipes/capitalizeFirstLetter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EventsForDayComponent,
    capitalizeFirstLetter
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
