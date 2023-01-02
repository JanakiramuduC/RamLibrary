import { Component,OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  constructor(private router:Router ){ }

  userName:string="RRRRRRRR";
  userid:number=0;

ngOnInit():void {
  this.reDirecttoLogin();
  this.displayMethod();
}
  reDirecttoLogin(){
    if(localStorage.getItem("LOGGED_IN")==null){
      this.router.navigate(['/login']);
    }
  }

  displayMethod(){
    let userinfo=JSON.parse(localStorage.getItem("LOGGED_IN")!);
    if(userinfo!=null){
      this.userName=userinfo.firstName;
      this.userid=userinfo.id;
    }
  }

  
}
