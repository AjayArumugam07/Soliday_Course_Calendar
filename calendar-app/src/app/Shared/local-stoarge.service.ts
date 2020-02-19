import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalStoargeService {

    databaseSessionKey: string;
    mismatch: boolean;

    constructor(private authService: AuthService, private http: HttpClient) { }

    fetchLocalData(key: string) {
        return localStorage.getItem(key);
    }

    isLocalCopy(accessCode: string) {
        return this.http.get<courseDetails>('https://app-calendar-65dc1.firebaseio.com/calendarInformation/' + this.authService.user.value.id + '/accessCode/' + accessCode + '/.json?auth=' + this.authService.user.value.token)
            .pipe(tap(resData => {
                if (resData.key) {
                    if (this.fetchLocalData(accessCode) == resData.key) {
                        this.mismatch = false;
                    }
                    else {
                        this.mismatch = true;
                        this.databaseSessionKey = resData.key;
                    }
                }
                else {
                    this.mismatch = true;
                }
            }))
    }

    saveData(object: any, accessCode: string, randomSessionKey: string) {
        localStorage.setItem(accessCode, randomSessionKey);
        localStorage.setItem(accessCode + 'holder', JSON.stringify(object));
    }

    generateKey() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
}

interface courseDetails{
    title: string;
    key: string;
}
