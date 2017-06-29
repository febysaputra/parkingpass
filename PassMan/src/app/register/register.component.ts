import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//inject Service
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/observable/of';
import { Http,Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[AuthenticationService]
})
export class RegisterComponent implements OnInit {

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
  confirm_password="";
  datalist;
  register(){

    let header= new Headers();
    header.append('Content-type', 'application/json' );

    this.authenticationService.register(this.email, this.password, this.confirm_password)
    .subscribe(
      data=> {
        // this.datalist = data;
        console.log('ini hasil request beenran ada', data);
        if(data.status){
          swal(
            'Good Job!',
            'Register Success!',
            'success'
          )
          this.router.navigate(['login']);//if succes masuk ke halaman lain
        }
        else
          swal(
            'Failed',
            data.message,
            'info'
          )
     }
    );
  }

  cancel(){
		 swal({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
			}).then(function () {
		  swal(
		    'Deleted!',
		    'Your file has been deleted.',
		    'success'
		  )
		})
  }
}
