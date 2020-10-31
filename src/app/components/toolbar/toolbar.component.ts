import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
import _ from 'lodash';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  user: any;
  notifications = [];
  socket: any;
  count = [];
  chatList = [];
  msgNumber: any;

  constructor(
    private tokenService: TokenService,
    protected router: Router,
    private userService: UsersService
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
    })

    const dropDownElement3 = document.querySelectorAll('.dropdown-trigger3');
    M.Dropdown.init(dropDownElement3, {
      allignment: 'left',
      hover: false,
      coverTrigger: false
    })

    const dropDownElement2 = document.querySelector('.dropdown-button');
    M.Dropdown.init(dropDownElement2,{
      allignment: 'right',
      hover: false,
      coverTrigger: false,
    }
  );

    this.GetNotifications();
    this.socket.on('refreshPage', () => {
      this.GetNotifications();
    })
  }

  GetNotifications(){
    this.userService.GetUserById(this.user._id).subscribe(data => {
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

  TimeFromNow(time){
    return moment(time).fromNow();
  }

  MarkAll() {
    this.userService.MarkAllAsRead().subscribe(data => {
      this.socket.emit('refresh', {});
    });
  }

  MessageDate(data) {
    return moment(data).calendar(null, {
      sameDay: '[Today]',
      lastDay: '[Yesterday]',
      lastWeek: 'DD/MM/YYYY',
      sameElse: 'DD/MM/YYYY'
    })
  }

  CheckIfRead(arr){
    const checkArr = [];
    for(let i = 0; i<arr.length; i++){
      const receiver = arr[i].msgId.message[arr[i].msgId.message.length -1];
      if(this.router.url !== `/chat/${receiver.sendername}`){
        if(receiver.isRead === false && receiver.receiverName === this.user.username){
          checkArr.push(1);
          this.msgNumber = _.sum(checkArr);
        }
      }
    }
  }
}
