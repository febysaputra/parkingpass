import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';//add http module
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  pathRegister = 'http://localhost:2370/register';
  pathLogin = 'http://localhost:2370/login';
  pathSetKey = 'http://localhost:2370/setkey';
  pathcheckToken = 'http://localhost:2370/checktoken';
  pathcheckKey = 'http://localhost:2370/checkkey/';

  pathSetItem = 'http://localhost:2370/setitem';
  pathGetItem = 'http://localhost:2370/getitem';
  pathGetAllItem = 'http://localhost:2370/getallitem/';
  pathDeleteItem = 'http://localhost:2370/deleteitem'

  public loggedin = new Subject<boolean>();
  public loggedinObserver = this.loggedin.asObservable();

  constructor(private http:Http) { }

  checktoken(token){
   let send = {token: token};
   let header = new Headers();
     header.append('Content-type', 'application/json');
    return this.http.post(this.pathcheckToken, send, {headers:header})
      .map((response: Response) => 
        response.json())
  }

  login(email: string, password: string) {
	let send = JSON.stringify({email: email, password:password });//bikin data inputan lu jadi string json
	console.log('ini yang dikirm',send);
	let header= new Headers();
    header.append('Content-type', 'application/json' );
    return this.http.post(this.pathLogin, send, {headers:header})
        .map((response: Response) => 
        	response.json())
            
  }

  hasLogin(state){
    console.log("has Login "+state);
    this.loggedin.next(state);
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

  register(email: string, password: string, confirm_password:string){
	  let send = JSON.stringify({email: email, password:password, confirm_password:confirm_password });//bikin data inputan lu jadi string json
	  console.log('ini yang dikirm',send);
	  let header= new Headers();
    header.append('Content-type', 'application/json' );

    return this.http.post(this.pathRegister, send, {headers:header})
        .map((response: Response) => 
        	response.json())

  }

  getPlainPass(master_key:string, id_manpass:string){
    let send = JSON.stringify({master_pass:master_key, tokenkey: localStorage.getItem('currentUser'), id_manpass:id_manpass});//bikin data inputan lu jadi string json
    console.log('ini yang dikirm elah',send);
    let header= new Headers();
    header.append('Content-type', 'application/json' );

    return this.http.post(this.pathGetItem, send, {headers:header})
        .map((response: Response) => 
          response.json())
  }

  openSuitcase(master_key:string){
    let send = JSON.stringify({master_key:master_key});//bikin data inputan lu jadi string json
    console.log('ini yang dikirm elah',send);
    let header= new Headers();
    header.append('Content-type', 'application/json' );

    return this.http.post(this.pathGetAllItem + localStorage.getItem('currentUser'), send, {headers:header})
        .map((response: Response) => 
          response.json())
  }

  setKeySuitcase(tokenkey:string){
    let send = JSON.stringify({token:localStorage.getItem('currentUser'),key:tokenkey});
    let header = new Headers();
    header.append('Content-type', 'application/json' );

    return this.http.post(this.pathSetKey, send, {headers:header})
        .map((response: Response) => 
          response.json())
  }

  public loginState(cek){
      this.loggedin = cek;
  }

  getAllItem(){

    var id = localStorage.getItem('currentUser');
    //id disini itu tokennya 
    
    //console.log(id);
    return this.http.get(this.pathGetAllItem + id)
      .map((response: Response) =>
        response.json())
        
  }

  setItem(akun, password, keterangan){
    let send = JSON.stringify({token:localStorage.getItem('currentUser'),account:akun, password_acc:password, keterangan:keterangan});
    let header = new Headers();
    header.append('Content-type', 'application/json' );

    return this.http.post(this.pathSetItem, send, {headers:header})
        .map((response: Response) => 
          response.json())
  }

  deleteItem(id_pass){
    let send = JSON.stringify({token:localStorage.getItem('currentUser'),id_manpass: id_pass});
    let header = new Headers();
    header.append('Content-type', 'application/json' );

    return this.http.post(this.pathDeleteItem, send, {headers:header})
        .map((response: Response) => 
          response.json())
  }

}
