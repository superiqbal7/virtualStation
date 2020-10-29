import { UsersService } from './../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  receiverName: string;
  user: any;
  message: string;
  receiverData: any;

  constructor(
    private tokenService: TokenService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) { }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      this.receiverName = params.name;
      this.GetUserByUsername(this.receiverName);
    });
  }

  GetUserByUsername(name) {
    this.userService.GetUserByUserName(name).subscribe(data => {
      this.receiverData = data.result;
    })
  }

  SendMessage(){
    if(this.message){
      this.msgService.SendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message).subscribe(data => {
        console.log(data);
        this.message= '';
      })
    }
  }

}
