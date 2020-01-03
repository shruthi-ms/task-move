import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";
import { NodeServiceService } from "../../node-service.service";
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { mergeMap, groupBy, reduce } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  SheetDataWithFilter : any;
  SheetData : any;
  errorMessage : any;
  allData: any;  
  threadlist: any = JSON.parse('[{"ThreadId":1,"Members":"Alice"},{"ThreadId":1,"Members":"Bob"},{"ThreadId":2,"Members":"Alice"},{"ThreadId":2,"Members":"Bob"},{"ThreadId":3,"Members":"Admin"},{"ThreadId":4,"Members":"Alice"},{"ThreadId":4,"Members":"Bob"},{"ThreadId":5,"Members":"Alice"},{"ThreadId":5,"Members":"Bob"},{"ThreadId":6,"Members":"Alice"},{"ThreadId":6,"Members":"Bob"},{"ThreadId":7,"Members":"Alice"},{"ThreadId":7,"Members":"Bob"},{"ThreadId":8,"Members":"Alice"},{"ThreadId":8,"Members":"Bob"},{"ThreadId":9,"Members":"Alice"},{"ThreadId":9,"Members":"Bob"}]');

  constructor(private nodeService: NodeServiceService, private router: Router, private dataservice: DataService) { }

  login(){
    this.router.navigate(['/login']);
  }
  ngOnInit() {
    // console.log("============>>>>");
    // console.log(this.threadlist);
    // this.threadlist = JSON.parse(this.threadlist);
    this.nodeService.getAllSheetData().subscribe(
      data => {
        if(this.dataservice.currentUser == "Admin"){
          this.allData = data;
          // console.log(data);
          // this.threads = data;
        }
        else{
          
          this.allData = data;
          // this.threads = data.filter(item=> item.messageOwner == this.dataservice.currentUser);
          // console.log("========================>");
        }
      },
      error => this.errorMessage = <any>error
    );
    
    //check for the user to filter display data 
    this.nodeService.getAllSheet1Data().subscribe(
      data => {
        if(this.dataservice.currentUser == "Admin"){
          this.threadlist = data.filter(item=> item.Members == this.dataservice.currentUser);
          // console.log(data);
          // this.threads = data;   
        }
        else{
          
          this.threadlist = data.filter(item=> item.Members == this.dataservice.currentUser);
          const p = data.filter(item=> item.Members == "Admin");
          const min = 1;
          const max = 9;
          for(let i=min;i<=max;i++){
            if(this.threadlist.filter(item=> item.ThreadId===i).length > 0){
              continue;
            }
            else{
              if(data.filter(item=>item.ThreadId===i && item.Members==="Admin").length==1 && (data.filter(item=>item.ThreadId===i && item.Members==this.dataservice.currentUser).length==0) && (data.filter(item=>item.ThreadId===i).length==1)){
                this.threadlist.splice(this.threadlist.length,0,{"ThreadId":i,"Members":"Admin"});
              }
            }
          }
          console.log("================>",this.threadlist)
        }
      },
      error => this.errorMessage = <any>error
    );

    
  }
  //check functions 
  check(a: number,b: number) {
    
    var flag: boolean = a === b ? true : false;
    // console.log(flag);
    return flag;
  }
  checkname(s: string) {
    
    var flag: boolean = (this.dataservice.currentUser === s) ? true : false;
    // console.log(flag);
    return flag;
  }
  checknameadmin(s: string) {
    
    var flag: boolean = (s === "Admin" && this.dataservice.currentUser !="Admin" ) ? true : false;
    // console.log(flag);
    return flag;
  }
  checknamenot(s: string) {
    
    var flag: boolean = (this.dataservice.currentUser === s || s==="Admin") ? false : true;
    // console.log(flag);
    return flag;
  }
  delete(n: number){
    alert("in delete");
  }
}
