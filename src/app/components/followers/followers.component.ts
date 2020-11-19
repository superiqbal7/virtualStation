import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import io from "socket.io-client";
import _ from 'lodash';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers =[];
  following =[];
  loggedInUser: any;
  socket: any;

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:3000')
   }

  ngOnInit() {
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUser();
    this.socket.on('refreshPage', ()=> {
      this.GetUser();
    })
  }

  GetUser() {
    this.userService.GetUserById(this.loggedInUser._id)
      .subscribe(data => {
        console.log(data);
        this.followers = data.result.followers;
        this.following = data.result.following;
      });
  }

//follow user that followed logedin user ----
  FollowUser(user) {
    this.userService.FollowUser(user._id).subscribe(data => {
      // console.log(data);
      this.socket.emit('refresh', {});
    })
  }

  CheckInArray(arr, id) {
    console.log(arr);
    console.log(id);


    const result = _.find(arr, ['userFollowed._id', id])
    if (result) {
      return true;
    }
    else return false;
  }
  //------

}
