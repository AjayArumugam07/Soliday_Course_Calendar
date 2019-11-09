import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

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

    constructor(private fb: FormBuilder, private authSerivce: AuthService, private router: Router, private elementRef: ElementRef) { }

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

        //  this.eventsForm.valueChanges.subscribe(newVal => console.log(newVal))
    }


    onAccountCreation(signUpData) {
        if (!this.accountCreationForm.valid) {
            return;
        }

        this.isLoading = true;
        console.log(signUpData);
        const email = signUpData.emailCreation;
        const password = signUpData.passwordCreation;
        this.authSerivce.signup(email, password).subscribe(
        resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/dashboard']);
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
        this.authSerivce.login(email, password).subscribe(
            resData => {
                console.log(resData);
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
