import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardBodyComponent } from './dashboard-body/dashboard-body.component';
import { AuthComponent } from './auth/auth.component';
import { CalendarEditComponent } from './calendar-edit/calendar-edit.component';

const routes: Routes = [
    { path: 'dashboard', component: DashboardBodyComponent },
    { path: 'auth', component: AuthComponent },
    { path: 'dashboard/editCalendar/:calendarTitle', component: CalendarEditComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
