import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

//inject Service
import { AuthenticationService } from '../services/authentication.service';
import 'rxjs/add/observable/of';
import { Http,Headers } from '@angular/http';
import 'rxjs/Rx';

@Component({
  selector: 'app-tablecase',
  templateUrl: './tablecase.component.html',
  styleUrls: ['./tablecase.component.css'],
  providers:[AuthenticationService]
})
export class TablecaseComponent implements OnInit {
	returnUrl: string;
	length=[{
		account_name:'kaka', pass:'halola', status:'', button:''
	},
	{
		account_name:'joko', pass:'halo', status:'', button:''
	},
	{
		account_name:'jebe', pass:'haasdfla', status:'', button:''
	},
	{
		account_name:'awsr', pass:'sadfalola', status:'', button:''
	},
	{
		account_name:'iyaa', pass:'hla', status:'', button:''
	},
	{
		account_name:'noway', pass:'asdhalola', status:'', button:''
	}
	];
	constructor(private route: ActivatedRoute,
              private router: Router,
              private http: Http,
              private authenticationService: AuthenticationService) { }

	//atribut2 login
	master_key='';
  //buat nyimpone data
  datalist:any;

  akun='';
  pass='';
  keterangan='';

  ngOnInit() {
    this.akun = '';
    this.pass = '';
    this.keterangan = '';
    this.getAll();

  }

  getAll(){
    this.authenticationService.getAllItem()
      .subscribe(
        data => {
          console.log('datalistnya',data);
          if(data.status){

            this.datalist = data.result; 
            //append status and button type to translateObject
            for (let item of this.datalist){
               item.status='';
               item.button='';
             }
              console.log('ini get all item', this.datalist);
              console.log('panjang list', this.datalist.length);

          }
          else
            this.datalist=[]
      })

  }



  retrieve(id_manpass:string, ol){
    console.log('id manpas', id_manpass);
  	let header= new Headers();
    header.append('Content-type', 'application/json' );
    this.authenticationService.getPlainPass(this.master_key, id_manpass)
    .subscribe(
      data=> {
        console.log(this.datalist);
        console.log('ini hasil request beenran ada', data.status);

        if(data.status){
          var id_mp = data.result.id_manpass;
          var pass_dec = data.result.origin;

          var posisi = this.datalist.findIndex(x => x.id_manpass == id_mp);
          
          this.datalist[posisi].password_acc = pass_dec;
          this.datalist[ol].status="success";
          this.datalist[ol].button="disabled";

          swal(
            'Berhasil!',
            'Password terdekripsi',
            'success'
          )


        }
        else
          swal(
            'Failed',
            'wrong Master Key',
            'info'
          )
     }
    );
    // ngmodel to null after submit current master for current pass
    this.master_key='';

  }

  getStatus(i){
  	return this.datalist[i].status;
  }

  getButton(i){
  	console.log('ini status ke i beraoa kali dah ',this.datalist[i].button); 
  	return this.datalist[i].button;
  }

  setItem(){
    let header= new Headers();
    header.append('Content-type', 'application/json' );
    console.log("harunsya ini yang dikirim", {akun:this.akun, pass:this.pass, keterangan:this.keterangan})
    this.authenticationService.setItem(this.akun, this.pass, this.keterangan)
    .subscribe(
      data=> {
        console.log(data.message);
        if(data.status){
          swal(
            'Berhasil!',
            'Data password ditambahkan',
            'success'
          )
          this.ngOnInit();
        }
        else
          swal(
            'Failed',
            'Failed Set Item',
            'info'
          )
     }
    );    
  }

  deleteConfirm(){
    return swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })  
  }

  deleteItem(id){
    this.deleteConfirm().then(res => {
      this.authenticationService.deleteItem(id)
        .subscribe(data =>{
          if(data.status){
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            this.ngOnInit();
          }else{
            console.log(data);
          }
        })
    }).catch(err => {})
    
  }
}
