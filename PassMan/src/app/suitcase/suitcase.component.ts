import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//inject Service
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/observable/of';
import { Http,Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-suitcase',
  templateUrl: './suitcase.component.html',
  styleUrls: ['./suitcase.component.css'],
  providers:[AuthenticationService]
})
export class SuitcaseComponent implements OnInit {
	returnUrl: string;
  hasKey: boolean = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
     this.checkKey();
  }
  master_key='';
  datalist;
  openSuitcase(){
  	let header= new Headers();
    header.append('Content-type', 'application/json' );
    console.log("harunsya ini yang dikirim", {key:this.master_key})
    this.authenticationService.openSuitcase(this.master_key)
    .subscribe(
      data=> {
        console.log('ini hasil request beenran ada', data);
        if(data.success){
          swal(
            'Good Job!',
            'Open Suitcase Successfull!',
            'success'
          )
        }
        else
          swal(
            'Failed',
            'wrong email or Password',
            'info'
          )
     }
    );
    // ngmodel to null after submit current master for current pass
    this.master_key='';

  }

  tokenkey='';
  setKey(){
    let header= new Headers();
    header.append('Content-type', 'application/json' );
    this.authenticationService.setKeySuitcase(this.master_key)
    .subscribe(
      data=> {
        console.log('ini hasil request beenran ada', data);
        if(data.status){
          swal(
            'Good Job!',
            'Create Key Successfull!',
            'success'
          )
          this.router.navigate(['table']);
        }
        else
          swal(
            'Failed',
            'wrong email or Password',
            'info'
          )
     }
    );
    // ngmodel to null after submit current master for current pass
    this.master_key='';
  }

  checkKey(){
    var id = localStorage.getItem('currentUser');
    console.log(id);
    this.http.get(this.authenticationService.pathcheckKey + id)
      .subscribe(res => {
        let data = res.json();
        if(data.status){
           this.hasKey =  true;
        }else{
          this.hasKey = false;
        }
      });
  }


}
