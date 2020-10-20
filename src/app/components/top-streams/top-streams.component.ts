import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { PostService } from 'src/app/services/post.service';
import { TokenService } from 'src/app/services/token.service';
import io from 'socket.io-client'

import _ from 'lodash'

@Component({
  selector: 'app-top-streams',
  templateUrl: './top-streams.component.html',
  styleUrls: ['./top-streams.component.css']
})
export class TopStreamsComponent implements OnInit {

  socket: any;
  topPosts = [];
  user: any;
  commentIcon = 0;
  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.socket = io('http://localhost:3000')
  }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    this.AllPosts();
    //console.log();
    this.socket.on('refreshPage', data => {
      this.AllPosts();
    })
  }

  AllPosts() {
    this.postService.getAllPosts().subscribe(data => {
      this.topPosts = data.top;
      console.log(this.topPosts);
    }, err => {
      if (err.error.token === null) {
        this.tokenService.DeleteToken();
        this.router.navigate(['']);
      }
    })
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

  LikePost(post) {
    this.postService.addLike(post).subscribe(data => {
      console.log(data);
      this.socket.emit('refresh', {});
    }, err => console.log(err)
    );
  }

  CheckInLikesArray(arr, username) {
    return _.some(arr, { username: username });
  }

  OpenCommentBox(post) {
    this.router.navigate(['post', post._id]);
    //this.commentIcon == 1 ? this.commentIcon = 0 : this.commentIcon = 1;
  }

}
