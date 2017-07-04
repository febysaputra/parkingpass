import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Subscription } from 'rxjs/Subscription';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthenticationService]
})
export class HeaderComponent implements OnInit {
  isLoggedin: boolean;
  subscription: Subscription;

  constructor(public router: Router, public authenticationService: AuthenticationService) {
    this.authenticationService.loggedinObserver.subscribe(state => {
      this.isLoggedin = state;
      console.log("Ada disini woy!", state);
    })
    if(localStorage.getItem('currentUser')){
      this.isLoggedin = true;
    }
   }

  ngOnInit() {
  }

  logout(){
  	 this.authenticationService.logout();
  	 swal(
            'Good Job!',
            'Logout Success!',
            'success'
          )
  	 this.authenticationService.hasLogin(false);
     this.router.navigate(['/home']);
  }

}
