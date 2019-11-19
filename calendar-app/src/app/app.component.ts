import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    ngOnInit() {
        this.authService.autoLogin();
    }

    items: Observable<any[]>;
    constructor(db: AngularFireDatabase, private authService: AuthService) {
        this.items = db.list('items').valueChanges();
    }


  
}
