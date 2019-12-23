import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { userInformation } from '../Shared/user-Information.model';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    isLoginMode: boolean;
    isLoading = false;
    error: string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    authenticationForm: FormGroup;
    accountCreationForm: FormGroup;
    professions = ['Student', 'Teacher'];

    constructor(private db: AngularFireDatabase, private fb: FormBuilder, private authService: AuthService, private router: Router, private elementRef: ElementRef, private http: HttpClient, private route: ActivatedRoute) { }

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

        this.route.params.subscribe(
            (params: Params) => {
                if (this.route.snapshot.params['mode'] == 'true') {
                    this.isLoginMode = true;
                }
                else if (this.route.snapshot.params['mode'] == 'false') {
                    this.isLoginMode = false;
                }
            }
        )


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
                        this.http.put<userInformation>('https://app-calendar-65dc1.firebaseio.com/userInformation/' + this.authService.currentUser.id + '/.json?auth=' + this.authService.currentUser.token, 
                            new userInformation(this.authService.currentUser.id, signUpData.profession)
                        ).subscribe(responseData => {
                            this.authService.getProfession().subscribe(resData => {
                                if (resData == 'Student') {
                                    this.isLoading = false;
                                    this.router.navigate(['/studentDashboard']);
                                } else if (resData == 'Teacher') {
                                    this.isLoading = false;
                                    this.router.navigate(['/dashboard']);
                                }
                            });
                        });
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
                this.authService.getProfession().subscribe(resData => {
                    if (resData == 'Student') {
                        this.isLoading = false;
                        this.router.navigate(['/studentDashboard']);
                    } else if (resData == 'Teacher') {
                        this.isLoading = false;
                        this.router.navigate(['/dashboard']);
                    }
                });
            },
            error => {
                console.log(error);
                this.error = 'An error occured';
                this.isLoading = false;
            });
    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'aliceblue';
    }
}
