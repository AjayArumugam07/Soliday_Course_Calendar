import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

    constructor(db: AngularFireDatabase, private authService: AuthService, private route: ActivatedRoute) {
        this.items = db.list('items').valueChanges();
    }


    appear = this.route.snapshot.params['appear'];

    ngOnInit() {
        this.authService.autoLogin();
    }

    ngAfterInit() {

    }

    items: Observable<any[]>;


  
}
