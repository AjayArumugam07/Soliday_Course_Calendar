import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';
import { Router } from '@angular/router';

interface AuthReponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    user = new BehaviorSubject<User>(null);
    currentUser: User;
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    signup(email: string, password: string) {


        return this.http.post<AuthReponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA98ZPBqN1TB6Z5c7sqql6lKBPaGfz26hE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })


    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        this.currentUser = new User(email, userId, token, expirationDate);
        this.user.next(this.currentUser);
        localStorage.setItem('userData', JSON.stringify(this.currentUser));
        this.autoLogout(expiresIn * 1000);
        console.log(this.currentUser);
        
    }

    login(email: string, password: string) {
        return this.http.post<AuthReponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA98ZPBqN1TB6Z5c7sqql6lKBPaGfz26hE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(tap(resData => {
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
               // return resData.localId;
            }));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.currentUser = loadedUser;
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    getProfession() {
        return this.http.get('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.currentUser.id + '/profession/.json?auth=' + this.currentUser.token);
    }

}
