import { StickyDirection } from '@angular/cdk/table';
import { JsonPipe } from '@angular/common';
import { Component,OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddbookComponent } from '../addbook/addbook.component';
import { DataService } from '../data.service';
import { UpdatebookComponent } from '../updatebook/updatebook.component';

export interface Ibook{
  ISBN:string,
  Title:string,
  Author:string,
  Category:string,
  Description:string,
  Action:string

}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})


export class BooksComponent implements OnInit {

  Books:any=[];

  dataSource=new MatTableDataSource<Ibook>(this.Books);

  displayedColumn=["ISBN", "Title","Author","Category","Description","Action"];
 @ViewChild(MatPaginator) paginator?:MatPaginator;

  constructor(private service:DataService,private router:Router,private dialog:MatDialog){ }

  ngOnInit(): void {
    this.bindBookData();
  }
  ngAfterViewInit(){
    this.dataSource.paginator=this.paginator!;
  }
  bindBookData(){
    this.service.getBooks().subscribe(
      (bookdata:any)=>{
        console.log("books ",bookdata);
        
        this.Books=bookdata;
      console.log("books_rev",this.Books);
      
        this.dataSource=new MatTableDataSource<Ibook>(this.Books);
      }
    )
  }

  currentRoleId:string="";
  currentUserInfo:any=[];
  getUserInfo(){
    this.currentUserInfo=JSON.parse(localStorage.getItem("LOGGEG_IN")!);
    if(this.currentUserInfo!=null)
    {
      this.currentRoleId=this.currentUserInfo["role"];
      console.log("this.current user Role ",this.currentRoleId);
      
    }
  }

  fnUpadte(BookId:string){
    let dialogRef=this.dialog.open(
      UpdatebookComponent,{
        data:{
          BookComId:BookId
        },
        height:"400px"
        ,width:"400px"
      }
    );

    dialogRef.afterClosed().subscribe(
      (updateData:any)=>{
        if(updateData!=null){
          this.bindBookData();

        }
      }
    );
   }
   fnDelete(id:string){
    let comfirmed:boolean=confirm("Are you sure you want to delete? ");
    if(!comfirmed){
      return;
    }
    this.service.deteBookBy(id).subscribe(
      (res:any)=>{
        alert("Successfully Deleted!");
        this.bindBookData();
      }
    );
   }

   fnAddBook(){
    let dialogRef=this.dialog.open(
      AddbookComponent,{
        height:"500px"
        ,width:"400px"
      }
    );

    dialogRef.afterClosed().subscribe(
      (updateData:any)=>{
        if(updateData!=null){
          this.bindBookData();

        }
      }
    );
   }

   applyFilter(searchData:string){
    this.dataSource.filter=searchData;

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
   }
}
