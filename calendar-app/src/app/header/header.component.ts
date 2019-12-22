import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    private userSub: Subscription;
    isAuthenticated = false;

    constructor(private authService: AuthService, private elementRef: ElementRef) { }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !user ? false : true;
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }

    logout() {
        this.authService.logout();
    }

}
