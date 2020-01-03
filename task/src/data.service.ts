import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  
  data: any;
  private messageSource = new BehaviorSubject('first message');
  currentMessage = this.messageSource.asObservable();
  user = "none";
  chatvarin = "none";
  chatvarout = "none";
  currentUser = "none";
  constructor() { }
  //data sharing services used/setters and getters
  setUser(u: string){
    this.user = u;
    console.log(this.user);
  }
  getUser(){
    return this.user;
  }

  setChatvarout(s: string){
    this.chatvarout = s;
    console.log("chat var set to: ",this.chatvarout);
  }
  getChatvarout(){
    return this.chatvarout;
  }

  setChatvarin(s: string){
    this.chatvarin = s;
    console.log("chat var set to: ",this.chatvarin);
  }
  getChatvarin(){
    return this.chatvarin;
  }


  changeMessage(message: string) {
    this.messageSource.next(message);
    // console.log(message,this.currentMessage);
  }

}