import { Component } from '@angular/core';
import {AuthService} from '../shared/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  user$: Observable<firebase.User> = this.authService.user$;
  constructor(private readonly authService: AuthService){
  }

  logIn(){
    console.log("login button clicked!");
    this.authService.initGoogleLogin();
  }

  logOut(){
    console.log("logout button clicked!");
    this.authService.logout();
    window.location.reload()
  }
}
