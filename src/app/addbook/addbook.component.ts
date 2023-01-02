import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {
  AddBookForm=new FormGroup({
    ISBN:new FormControl("",Validators.required),
    Title:new FormControl("",Validators.required),
    Author:new FormControl("",Validators.required),
    Category:new FormControl("",Validators.required),
    Description:new FormControl("",Validators.required)
  });

  constructor(private service:DataService,private router:Router,private dialogref:MatDialogRef<AddbookComponent>){}
  ngOnInit(): void {
    
  }
  addBook(){

    let AddBookInfo:any={};
    AddBookInfo["ISBN"]=this.AddBookForm.controls["ISBN"].value;
    AddBookInfo["Title"]=this.AddBookForm.controls["Title"].value;
    AddBookInfo["Author"]=this.AddBookForm.controls["Author"].value;
    AddBookInfo["Category"]=this.AddBookForm.controls["Category"].value;
    AddBookInfo["Description"]=this.AddBookForm.controls["Description"].value;

this.service.saveBook(AddBookInfo).subscribe(
  (res:any)=>{
    if(res!=null){
      alert("Successfully Book ");
      this.dialogref.close(res);
      //this.router.navigate(['/books']);
    }
  }
)
  }
}
