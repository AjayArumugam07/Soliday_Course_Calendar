import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from './user.model';

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

    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signup(email: string, password: string) {

        console.log(email);
        console.log(password);
        return this.http.post<AuthReponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA98ZPBqN1TB6Z5c7sqql6lKBPaGfz26hE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            });
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        console.log(user);
    }

    login(email: string, password: string) {
        return this.http.post<AuthReponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA98ZPBqN1TB6Z5c7sqql6lKBPaGfz26hE',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(tap(resData => {
                console.log('yes');
                this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
            }));
    }
}
