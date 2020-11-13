"use strict";
import { Component, OnInit, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @Output() onlineUsers = new EventEmitter();
  user: any;
  notifications = [];
  socket: any;
  count = [];
  chatList = [];
  messageCount: any;
  imageId: any;
  imageVersion: any;

  constructor(
    private tokenService: TokenService,
    protected router: Router,
    private userService: UsersService,
    private messageService: MessageService
  ) {
    this.socket = io('http://localhost:3000');
   }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    //console.log(this.user);


    const dropDownElement = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {
      allignment: 'right',
      hover: false,
      coverTrigger: false
    });

    const dropDownElement3 = document.querySelectorAll('.dropdown-trigger3');
    M.Dropdown.init(dropDownElement3, {
      allignment: 'left',
      hover: false,
      coverTrigger: false
    });

    const dropDownElement2 = document.querySelector('.dropdown-button');
    M.Dropdown.init(dropDownElement2,{
      allignment: 'right',
      hover: false,
      coverTrigger: false,
    });

    this.socket.emit('online', { room: 'global', user: this.user.username });

    this.GetNotifications();
    this.socket.on('refreshPage', () => {
      this.GetNotifications();
    })
  };

  ngAfterViewInit(){
    //online user info
    this.socket.on('usersOnline', (data)=>{
      //sending online user data to another component
      this.onlineUsers.emit(data);
    })
  }

  GetNotifications(){
    this.userService.GetUserById(this.user._id).subscribe(data => {
      this.imageId = data.result.picId;
      this.imageVersion = data.result.picVersion;
      this.notifications = data.result.notifications.reverse();
      const value = _.filter(this.notifications, ['read', false]);
      this.count = value;
      this.chatList = data.result.chatList;
      this.CheckIfRead(this.chatList);
    },
    //reload if token expired
    err => {
      if (err.error.token === null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    });
  }

  logout() {
    this.tokenService.DeleteToken()
    this.router.navigate(['']);
  }


  GoToHome(){
    this.router.navigate(['streams']);
  }

  GoToChatPage(name){
    this.router.navigate(['chat', name]);
    this.messageService.MarkMessages(this.user.username, name).subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
    })
  }

  TimeFromNow(time){
    return moment(time).fromNow();
  }

  MarkAll() {
    this.userService.MarkAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  MarkAllMessages(){
    this.messageService.MarkAllMessages().subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
      this.messageCount = 0;
    })
  }

  MessageDate(data) {
    // return moment(data).calendar(null, {
    //   sameDay: '[Today]',
    //   lastDay: '[Yesterday]',
    //   lastWeek: 'DD/MM/YYYY',
    //   sameElse: 'DD/MM/YYYY'
    // })
    return moment(data).fromNow()
  }

  CheckIfRead(arr){
    const checkArr = [];
    for(let i = 0; i<arr.length; i++){
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length -1];
      if(this.router.url !== `/chat/${receiver.sendername}`){
        if(receiver.isRead === false && receiver.receiverName === this.user.username){
          checkArr.push(1);
          this.messageCount = _.sum(checkArr);
        }
      }
    }
  }
}
