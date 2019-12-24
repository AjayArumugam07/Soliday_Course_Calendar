import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class TeacherGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> | UrlTree {
        if (this.authService.user.value.userInformation.profession == 'Teacher') {
            return true;
        }

        if (this.authService.user.value.userInformation.profession == 'Student') {
            return this.router.createUrlTree(['/studentDashboard']);
        }
    }

}
