import { Component ,OnInit, Inject} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../data.service';

@Component({
  selector: 'app-updatebook',
  templateUrl: './updatebook.component.html',
  styleUrls: ['./updatebook.component.css']
})
export class UpdatebookComponent implements OnInit {
  UpdateBookForm=new FormGroup(
  {
    ISBN:new FormControl(""),
    Title:new FormControl(""),
    Author:new FormControl(""),
    Category:new FormControl(""),
    Description:new FormControl("")
  }
  );

  constructor(private service:DataService,private dialogref:MatDialogRef<UpdatebookComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData:any){ }

  ngOnInit(): void {
    this.getBookById(this.dialogData.BookComId);
  }

  BookInfo:any={};
  getBookById(id:string){
    this.service.getBookById(id).subscribe(
      (respones:any)=>{
        if(respones!=null && respones!=undefined){
          this.BookInfo=respones;
          this.bindBookData(this.BookInfo);
          console.log("get book function by id",this.BookInfo);
          
        }
      }
    );
  }
  bindBookData(fnBookInfo:any){
    this.UpdateBookForm.controls["ISBN"].setValue(fnBookInfo["ISBN"]);
    this.UpdateBookForm.controls["Title"].setValue(fnBookInfo["Title"]);
    this.UpdateBookForm.controls["Author"].setValue(fnBookInfo["Author"]);
    this.UpdateBookForm.controls["Category"].setValue(fnBookInfo["Category"]);
    this.UpdateBookForm.controls["Description"].setValue(fnBookInfo["Description"]);
  }
  updateBook(){
    console.log("fn Upadte book functions")
    let bookUpdateData:any={};
    bookUpdateData["ISBN"]=this.UpdateBookForm.controls["ISBN"].value;
    bookUpdateData["Title"]=this.UpdateBookForm.controls["Title"].value;
    bookUpdateData["Author"]=this.UpdateBookForm.controls["Author"].value;
    bookUpdateData["Category"]=this.UpdateBookForm.controls["Category"].value;
    bookUpdateData["Description"]=this.UpdateBookForm.controls["Description"].value;

    this.service.updateBookById(this.dialogData.BookComId,bookUpdateData).subscribe(
      (respose:any)=>{
        console.log("res data print ",respose);
        
        if(respose!=null){
          alert("Upadate Successfully !");
          this.dialogref.close(respose);
        }
      }
    )
  }
}
