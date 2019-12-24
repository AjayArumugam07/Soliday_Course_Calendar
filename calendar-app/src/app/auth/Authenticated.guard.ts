import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticatedGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): boolean | Promise<boolean> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            take(1),
            map(user => {
                const isAuth = !!user;
                if (!isAuth) {
                    return true;
                } else if (isAuth) {
                    if (this.authService.user.value.userInformation.profession == 'Student') {
                        return this.router.createUrlTree(['studentDashboard']);
                    } else if (this.authService.user.value.userInformation.profession == 'Teacher') {
                        return this.router.createUrlTree(['dashboard']);
                    }
                }
            }));
    }

}
