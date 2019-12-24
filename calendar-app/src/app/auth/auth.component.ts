import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
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
        this.router.navigate(['/auth/' + !this.isLoginMode]);
        this.error = null;
    }

    authenticationForm: FormGroup;
    accountCreationForm: FormGroup;
    professions = ['Student', 'Teacher'];

    constructor(private db: AngularFireDatabase, private fb: FormBuilder, private authService: AuthService, private router: Router, private elementRef: ElementRef, private http: HttpClient, private route: ActivatedRoute)
    {
        this.authenticationForm = this.fb.group({
            'emailAuthentication': this.fb.control(null, [Validators.required, Validators.email]),
            'passwordAuthentication': this.fb.control(null, [Validators.required])
        })

        this.accountCreationForm = this.fb.group({
            'firstNameCreation': this.fb.control(null, [Validators.required]),
            'lastNameCreation': this.fb.control(null, [Validators.required]),
            'emailCreation': this.fb.control(null, [Validators.required, Validators.email]),
            'profession': this.fb.control(null, [Validators.required]),
            'password': this.fb.group({
            'passwordCreation': this.fb.control(null, [Validators.required, Validators.minLength(6)]),
            'confirmPasswordCreation': this.fb.control(null, [Validators.required])
            }, { validators: this.confirmPassword })

        })


    }

    ngOnInit() {


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
        if (this.accountCreationForm.valid) {
            this.isLoading = true;
            const email = signUpData.emailCreation;
            const password = signUpData.password.passwordCreation;
            this.authService.signup(email, password).subscribe(
                resData => {
                    console.log(resData);
                    this.authService.pushUser(signUpData).subscribe(() => {
                        console.log('here');
                        this.authService.login(email, password, true).subscribe(
                            () => {
                                this.authService.user.value.userInformation.profession = signUpData.profession;
                                console.log(this.authService.user);
                                if (signUpData.profession == 'Student') {
                                    this.isLoading = false;
                                    this.router.navigate(['/studentDashboard']);
                                } else if (signUpData.profession == 'Teacher') {
                                    this.isLoading = false;
                                    this.router.navigate(['/dashboard']);
                                }
                            });
                        })
                },
                error => {
                    console.log(error);
                    this.error = error;
                    this.isLoading = false;
                });
            this.accountCreationForm.reset();
        } else {
            this.error = 'Please enter Valid Data';
            console.log(this.accountCreationForm)
        }


    }

    onAuthentication(authenticationInfo) {
        if (this.authenticationForm.valid) {
            this.isLoading = true;
            const email = authenticationInfo.emailAuthentication;
            const password = authenticationInfo.passwordAuthentication;
            this.authService.login(email, password, false).subscribe(
                resData => {
                    this.authService.getProfession()
                        .subscribe(resData => {
                        if (this.authService.user.value.userInformation.profession == 'Student') {
                            this.isLoading = false;
                            this.router.navigate(['/studentDashboard']);
                        } else if (this.authService.user.value.userInformation.profession == 'Teacher') {
                            this.isLoading = false;
                            this.router.navigate(['/dashboard']);
                        }
                    });
                },
                error => {
                    console.log(error);
                    this.error = error;
                    this.isLoading = false;
                });
        } else {
            this.error = 'Please enter Valid Data';
            console.log(this.accountCreationForm)
        }


    }

    ngAfterViewInit() {
        this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'aliceblue';
    }

    confirmPassword(group: FormGroup): { [s: string]: boolean } {
        if (!(group.get('passwordCreation').value == group.get('confirmPasswordCreation').value)) {
            group.get('confirmPasswordCreation').setErrors({ 'not equivalent': true });
        } else {
            group.get('confirmPasswordCreation').setErrors(null);
        }
        return;
    }


}
