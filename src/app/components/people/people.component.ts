import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  users = [];
  loggedInUser: any;
  userArr = [];

  constructor(
    private userService: UsersService,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.loggedInUser = this.tokenService.GetPayload();
    this.GetUsers();
    this.GetUser();
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
    this.userService.GetUserById(this.loggedInUser._id)
      .subscribe(data => {
        this.userArr = data.result;
        console.log(this.userArr);
      });
  }

  FollowUser(user){
    // console.log(user);
    this.userService.FollowUser(user._id).subscribe(data => {
      console.log(data);
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
