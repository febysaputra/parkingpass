import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent {
  title = 'app works!';
  constructor(public authenticationService: AuthenticationService){
    this.authenticationService.loggedin.subscribe(state=>{
      console.log("App "+state);
    })
  }
}
