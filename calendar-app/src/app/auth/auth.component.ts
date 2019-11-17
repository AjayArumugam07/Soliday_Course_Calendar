import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { userInformation } from '../Shared/user-Information.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    isLoginMode = true;
    isLoading = false;
    error: string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    authenticationForm: FormGroup;
    accountCreationForm: FormGroup;
    professions = ['Student', 'Teacher'];

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private elementRef: ElementRef, private http: HttpClient) { }

    ngOnInit() {
        this.authenticationForm = this.fb.group({
            'emailAuthentication': this.fb.control(null),
            'passwordAuthentication': this.fb.control(null)
        })

        this.accountCreationForm = this.fb.group({
            'emailCreation': this.fb.control(null),
            'passwordCreation': this.fb.control(null),
            'confirmPasswordCreation': this.fb.control(null),
            'profession': this.fb.control(null)
        })
    }

    onAccountCreation(signUpData) {
        if (!this.accountCreationForm.valid) {
            return;
        }

        this.isLoading = true;
        const email = signUpData.emailCreation;
        const password = signUpData.passwordCreation;
        this.authService.signup(email, password).subscribe(
            resData => {
                this.authService.login(email, password).subscribe(
                    resData => {
                        this.isLoading = false;
                        console.log(this.authService.currentUser.token);
                        this.http.put<userInformation>('https://app-calendar-65dc1.firebaseio.com/.json?auth=' + this.authService.currentUser.token,
                            new userInformation(this.authService.currentUser.id, 'email')
                        ).subscribe(responseData => { this.router.navigate(['/dashboard']);});
                    })
        },
        error => {
            console.log(error);
            this.error = 'An error occured';
            this.isLoading = false;
        });
        this.accountCreationForm.reset();
    }

    onAuthentication(authenticationInfo) {
        if (!this.authenticationForm.valid) {
            return;
        }

        this.isLoading = true;
        const email = authenticationInfo.emailAuthentication;
        const password = authenticationInfo.passwordAuthentication;
        this.authService.login(email, password).subscribe(
            resData => {
                this.isLoading = false;
                this.router.navigate(['/dashboard']);
            },
            error => {
                console.log(error);
                this.error = 'An error occured';
                this.isLoading = false;
            });
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#13293D';
    }
}
