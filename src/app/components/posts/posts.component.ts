import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

import * as moment from 'moment'
import io from 'socket.io-client'

import _ from 'lodash'
import { TokenService } from 'src/app/services/token.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  socket: any;
  posts = [];
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
      this.posts = data.posts;
      console.log(this.posts);
    }, err => {
      if(err.error.token === null){
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

  CheckInLikesArray(arr, username){
    return _.some(arr, {username: username});
  }

  OpenCommentBox(post){
    this.router.navigate(['post', post._id]);
    //this.commentIcon == 1 ? this.commentIcon = 0 : this.commentIcon = 1;
  }

}
