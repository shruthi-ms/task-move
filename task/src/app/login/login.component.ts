import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from "../../data.service"; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  roles: any = ['Admin', 'Alice', 'Bob']; //types of logins - admin, privileged and normal user

  constructor(private router: Router, private dataservice: DataService) {}
  
  //check for the type of user and provide options needed as required
  loginClick(data){
    console.log("in the function", data.passwd, data.emailid);
    if(data.emailid=="Admin"){
      this.dataservice.currentUser = "Admin";
      this.dataservice.setUser("Admin");
      this.dataservice.setChatvarout("block");
      this.dataservice.setChatvarin("block");
    }
    if(data.emailid=="Alice"){
      this.dataservice.currentUser = "Alice";
      this.dataservice.setUser("Privi");
      this.dataservice.setChatvarout("block");
      this.dataservice.setChatvarin("none");
      // console.log(this.dataservice.getChatvarin()," ",this.dataservice.getChatvarout());
    }
    if(data.emailid=="Bob"){
      this.dataservice.currentUser = "Bob";
      this.dataservice.setUser("Normal");
      this.dataservice.setChatvarout("none");
      this.dataservice.setChatvarin("none");
    }
    this.router.navigate(['/dashboard']); //login to dashboard after login
  }
  ngOnInit() {
    this.dataservice.changeMessage("hello");
  }
  

}
