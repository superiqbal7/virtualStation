import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import io from "socket.io-client";

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  following = [];
  loggedInUser: any;
  socket: any;

  constructor(private tokenService: TokenService, private userService: UsersService) {
    this.socket = io('http://localhost:3000');
   }

  ngOnInit() {
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUser();

    this.socket.on('refreshPage',()=>{
      this.GetUser();
    })
  }

  GetUser() {
    this.userService.GetUserById(this.loggedInUser._id)
      .subscribe(data => {
        console.log(data);

        this.following = data.result.following;
        console.log(this.following);
      },
      err => console.log(err)
      );
  }

  UnFollowUser(user){
    this.userService.UnFollowUser(user._id).subscribe(data => {
      console.log(data);
      this.socket.emit('refresh',{});
    })
  }

}
