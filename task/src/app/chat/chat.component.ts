import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private dataservice: DataService) { }

  ngOnInit() {
  }

}
