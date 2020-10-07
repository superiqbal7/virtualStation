import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import * as M from 'materialize-css';
import { UsersService } from 'src/app/services/users.service';
import * as moment from 'moment';
import io from 'socket.io-client';
@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  user: any;
  notifications = [];
  socket: any;

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


    const dropDownElement = document.querySelector('.dropdown-trigger');
    M.Dropdown.init(dropDownElement, {
      allignment: 'right',
      hover: true,
      coverTrigger: false
    })

    this.GetNotifications();
    this.socket.on('refreshPage', () => {
      this.GetNotifications();
    })
  }

  GetNotifications(){
    this.userService.GetUserById(this.user._id).subscribe(data => {
      this.notifications = data.result.notifications.reverse();
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
}
