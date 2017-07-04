import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//inject Service
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/observable/of';
import { Http,Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthenticationService]
})
export class LoginComponent implements OnInit {	
	returnUrl: string;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              public authenticationService: AuthenticationService) { }

  ngOnInit() {
  	// get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //console.log(this.returnUrl);
    if(localStorage.getItem('currentUser')){
      let datatoken = localStorage.getItem('currentUser');
      //console.log(datatoken);
      this.authenticationService.checktoken(datatoken)
        .subscribe(
          data => {
            console.log(data);
            if(data.status){
              this.router.navigate['suitcase'];
            }
          });
    }
  }

  //atribut2 login
  email="";
  password="";
  datalist;
  
  login(){

    let header= new Headers();
    header.append('Content-type', 'application/json' );

    this.authenticationService.login(this.email, this.password)
    .subscribe(
      data=> {
        // this.datalist = data;
        console.log('ini hasil request beenran ada', data);
        if(data.status){
          swal(
            'Good Job!',
            'Login Success!',
            'success'
          )
          this.authenticationService.hasLogin(true);
          localStorage.setItem('currentUser', data.token);
          this.router.navigate(['suitcase']);//if succes masuk ke halaman lain
        }
        else
          swal(
            'Failed',
            'wrong email or Password',
            'info'
          )
     }
    );
  }

  


}
