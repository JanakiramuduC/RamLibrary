import { Component ,OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators}from '@angular/forms'
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  signupForm=new FormGroup({
    FirstName: new FormControl('', [Validators.required]),
    LastName: new FormControl('', [Validators.required]),
    Age: new FormControl('', [Validators.required]),
    Gender: new FormControl('', [Validators.required]),
    userEmail: new FormControl('', [Validators.required,Validators.email]),
    CreatePasswaord:new FormControl('',[Validators.required,Validators.minLength(8)]),
    ConfirmPasswaord:new FormControl('',[Validators.required,Validators.minLength(8)])
}); 

  constructor(private service:DataService,private router:Router){ }
  ngOnInit():void{

  }



Logins:any=[];
  fnsign(emaiId:any,createpass:any,ConfirmPass:any){

    this.service.getLogins().subscribe(
      (res:any)=>{
        this.Logins=res;
        let loginfo=this.Logins.filter((log:any)=>{
          return log.userEmail==emaiId;
        })
        if(loginfo.length>0){
          // localStorage.setItem("LOGGED_IN",JSON.stringify(loginfo[0]));
          // this.router.navigate(['/home']);
          alert("Email Already Exited!");
        }

        else if(createpass==ConfirmPass){
          console.log("workingg conditions")
           //sing up coding start


          let userInfo:any={};
           userInfo["firstName"]=this.signupForm.controls["FirstName"].value;
           userInfo["lastName"]=this.signupForm.controls["LastName"].value;
           userInfo["age"]=this.signupForm.controls["Age"].value;
           userInfo["gender"]=this.signupForm.controls["Gender"].value;
           userInfo["userEmail"]=this.signupForm.controls["userEmail"].value;
           userInfo["password"]=this.signupForm.controls["CreatePasswaord"].value;

           this.service.saveLogins(userInfo).subscribe(
            (response:any)=>{
              if(response!=null){
                alert("Successfully Signup!");
                this.router.navigate(['/logins']);
              }
            }
           )
        }
        else{
          alert("create Password Confirm Password does not match");
        }
      }
    );
  }

  // fnLogin(useremail:any,pass:any){
  //   console.log("loginnn")

  //   this.service.getLogins().subscribe(
  //     (res:any)=>{
  //       this.Logins=res;
  //       let loginfo=this.Logins.filter((log:any)=>{
  //         return log.userEmail==useremail && log.password==pass;
  //       })
  //       if(loginfo.length>0){
  //         localStorage.setItem("LOGGED_IN",JSON.stringify(loginfo[0]));
  //         this.router.navigate(['/home']);
  //       }
  //       else{
  //         alert("Invalid credentials");
  //       }


  //     }
  //   );

    
  // }
}
