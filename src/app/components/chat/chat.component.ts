import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, AfterViewInit {

  tabElement: any;
  online_Users = [];

  constructor() { }


  ngOnInit() {
    this.tabElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit(): void {
    this.tabElement.style.display = 'none';
  }

  online(event){
    this.online_Users = event;
  }

}
