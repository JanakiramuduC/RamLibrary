import { Component,OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators}from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginForm=new FormGroup({
    userEmail: new FormControl('', [Validators.required,Validators.email]),
    passwaord:new FormControl('',[Validators.required,Validators.minLength(8)])
}); 

  constructor(private service:DataService,private router:Router){ }
  ngOnInit(){

  }
  

  Logins:any=[];
  fnLogin(useremail:any,pass:any){
    console.log("loginnn")

    this.service.getLogins().subscribe(
      (res:any)=>{
        this.Logins=res;
        let loginfo=this.Logins.filter((log:any)=>{
          return log.userEmail==useremail && log.password==pass;
        })
        if(loginfo.length>0){
          localStorage.setItem("LOGGED_IN",JSON.stringify(loginfo[0]));
          this.router.navigate(['/home']);
        }
        else{
          alert("Invalid credentials");
        }


      }
    );

    
  }
}
