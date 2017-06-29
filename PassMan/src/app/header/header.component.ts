import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthenticationService]
})
export class HeaderComponent implements OnInit {

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit() {

  }

  logout(){
  	 this.authenticationService.logout();
  	 swal(
            'Good Job!',
            'Logout Success!',
            'success'
          )
  	 this.authenticationService.loginState(true);
  }

}
