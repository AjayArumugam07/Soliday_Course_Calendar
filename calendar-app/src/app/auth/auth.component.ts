import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    isLoginMode = true;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    authenticationForm: FormGroup;
    accountCreationForm: FormGroup;
    professions = ['Student', 'Teacher'];

    constructor(private fb: FormBuilder) {}

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
        console.log(signUpData);
    }

    onAuthentication(authenticationInfo) {
        console.log(authenticationInfo);
    }
}
