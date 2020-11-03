import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CaretEvent, EmojiEvent } from 'ng2-emoji-picker';
import { MessageService } from 'src/app/services/message.service';
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';
import _ from 'lodash';
import io from 'socket.io-client';
import * as moment from 'moment';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit, AfterViewInit, OnChanges {
  tabElement: any;
  online_Users = [];
  //message
  receiverName: string;
  user: any;
  message: string;
  receiverData: any;
  messagesArray = [];
  socket: any;
  typingMessage: any;
  typing: boolean = false;
  showEmojiPicker = false;
  isOnline: boolean = false;
  container: HTMLElement;


  //emoji variables
  eventMock;
  eventPosMock;

  direction = Math.random() > 0.5 ? (Math.random() > 0.5 ? 'top' : 'bottom') : (Math.random() > 0.5 ? 'right' : 'left');
  toggled = false;
  content = ' ';

  private _lastCaretEvent: CaretEvent;
  //----

  constructor(
    private tokenService: TokenService,
    private msgService: MessageService,
    private route: ActivatedRoute,
    private userService: UsersService
  ) {
    this.socket = io('http://localhost:3000');
  }

  ngOnInit() {
    this.tabElement = document.querySelector('.nav-content');

    this.user = this.tokenService.GetPayload();
    this.route.params.subscribe(params => {
      this.receiverName = params.name;
      this.GetUserByUsername(this.receiverName);

      this.socket.on('refreshPage', () => {
        this.GetUserByUsername(this.receiverName);
      })
    });


    this.socket.on('is_typing', data => {
      if (data.sender === this.receiverName) {
        this.typing = true;
      }
    });

    this.socket.on('stopped_typing', data => {
      if (data.sender === this.receiverName) {
        this.typing = false;
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("dhukse");
    if (changes.online_Users.currentValue.length > 0) {
      console.log(changes);

      const result = _.indexOf(changes.online_Users.currentValue, this.receiverName);
      console.log(result);

      if (result > -1) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
    }
  }

  ngAfterViewInit(): void {
    this.tabElement.style.display = 'none';
    const params = {
      room1: this.user.username,
      room2: this.receiverName
    };
    console.log(params);

    this.socket.emit('join chat', params);
  }

  online(event) {
    this.online_Users = event;
    console.log(this.online_Users);

    if (this.online_Users.length > 0) {

      const result = this.online_Users.indexOf(this.receiverName)
      if (result > -1) {
        this.isOnline = true;
      } else {
        this.isOnline = false;
      }
      console.log(result);
    }
    else{
      this.isOnline = false;
    }

  }

  //--
  GetUserByUsername(name) {
    this.userService.GetUserByUserName(name).subscribe(data => {
      this.receiverData = data.result;

      this.GetMessages(this.user._id, data.result._id)
    })
  }

  GetMessages(senderId, receiverId) {
    this.msgService.GetAllMessages(senderId, receiverId).subscribe(data => {
      this.messagesArray = data.messages.message;
      console.log(this.messagesArray);
      //auto scroll
      this.container = document.getElementById("chatbox");
      this.container.scrollTop = this.container.scrollHeight;
    })
  }

  SendMessage() {
    if (this.message) {
      this.msgService.SendMessage(this.user._id, this.receiverData._id, this.receiverData.username, this.message).subscribe(data => {
        console.log(data);
        this.socket.emit('refresh', {});
        this.message = '';
      })
    }
  }

  IsTyping() {
    this.socket.emit('start_typing', {
      sender: this.user.username,
      receiver: this.receiverName
    });

    if (this.typingMessage) {
      clearTimeout(this.typingMessage);
    }

    this.typingMessage = setTimeout(() => {
      this.socket.emit('stop_typing', {
        sender: this.user.username,
        receiver: this.receiverName
      });
    }, 500);
  }

  MessageTime(data) {
    // return moment(data).calendar(null, {
    //   sameDay: '[Today]',
    //   lastDay: '[Yesterday]',
    //   lastWeek: 'DD/MM/YYYY',
    //   sameElse: 'DD/MM/YYYY'
    // })
    return moment(data).calendar();
  }

  //---------------------Emoji---------

  toggleEmojiPicker() {
    this.toggled = !this.toggled;
  }

  HandleSelection(event: EmojiEvent) {
    this.content = this.content.slice(0, this._lastCaretEvent.caretOffset) + event.char + this.content.slice(this._lastCaretEvent.caretOffset);
    this.eventMock = JSON.stringify(event);

    this.message = this.content;
    this.toggled = !this.toggled;
    this.content = '';
  }

  HandleCurrentCaret(event: CaretEvent) {
    this._lastCaretEvent = event;
    this.eventPosMock = `{ caretOffset : ${event.caretOffset}, caretRange: Range{...}, textContent: ${event.textContent} }`;
  }

}
