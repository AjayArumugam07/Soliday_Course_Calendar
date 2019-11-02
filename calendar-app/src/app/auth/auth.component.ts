import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
