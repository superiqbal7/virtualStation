import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  users = [];
  loggedInUser: any;
  userArr = [];
  socket: any;

  constructor(
    private userService: UsersService,
    private tokenService: TokenService
  ) {
    this.socket = io('http://localhost:3000');
   }

  ngOnInit(): void {
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUsers();
    this.GetUser();

    this.socket.on('refreshPage', ()=>{
      this.GetUsers();
      this.GetUser();
    })
  }

  GetUsers(){
    this.userService.GetAllUsers()
      .subscribe(data => {
        console.log(data);
        _.remove(data.result, { username: this.loggedInUser.username })
        this.users = data.result;
        console.log(this.users);
      });
  }

  GetUser() {
    console.log(this.loggedInUser);

    this.userService.GetUserById(this.loggedInUser._id)
      .subscribe(data => {
        this.userArr = data.result.following;
        console.log(this.userArr);
      });
  }

  FollowUser(user){
    this.userService.FollowUser(user._id).subscribe(data => {
      // console.log(data);
      this.socket.emit('refresh',{});
    })
  }

  CheckInArray(arr, id) {
    // console.log(arr);
    // console.log(id);
    const result = _.find(arr, ['userFollowed._id', id])
    if(result){
      return true;
    }
    else return false;
  }

}
