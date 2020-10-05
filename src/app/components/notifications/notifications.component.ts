import { TokenService } from 'src/app/services/token.service';
import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  socket: any;
  user: any;
  notifications = [];

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:3000');
   }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', ()=>{
      this.GetUser();
    })
  }

  GetUser(){
    this.userService.GetUserById(this.user._id).subscribe(data => {
      console.log(data);
    })
  }

}
