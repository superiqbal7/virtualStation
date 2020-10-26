import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';
import _ from 'lodash'
import { TokenService } from 'src/app/services/token.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  socket: any;
  user: any;
  commentForm: FormGroup;
  postId: any;
  commentsArray = [];
  post: any;
  postOwner: any;
  x: any;

  constructor(
    private formbuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private tokenService: TokenService,
    private userService: UsersService
  ) {
    this.socket = io('http://localhost:3000')
   }

  ngOnInit() {
    this.user = this.tokenService.GetPayload();
    console.log(this.user);

    this.toolbarElement = document.querySelector('.nav-content');
    this.postId = this.route.snapshot.paramMap.get('id');
    this.init();

    this.GetPost();
    this.socket.on('refreshPage',(data)=>{
      this.GetPost();
    })
  }

  init(){
    this.commentForm = this.formbuilder.group({
      comment: ['', Validators.required]
    });
  }

  ngAfterViewInit(){
    this.toolbarElement.style.display = 'none'
  }

  AddComment(){
    this.postService.addCommment(this.postId, this.commentForm.value.comment).subscribe(data => {
      //console.log(data);
      this.socket.emit('refresh',{});
      this.commentForm.reset();
      //this.GetPost();
    })
  }

  GetPost() {
    this.postService.getPost(this.postId).subscribe(data => {
      console.log(data);
      this.post = data.post;
      this.commentsArray = data.post.comments;
      this.userService.GetUserByUserName(data.post.username).subscribe(data => {
        this.postOwner = data.result.name;
        console.log(this.postOwner);

      })
      //console.log(this.commentsArray);
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

  a(username){
    return this.getName(username);
  }

  getName(username){
  this.x = this.userService.GetUserByUserName(username)
      .subscribe(data => {
        console.log(data.result.name);
        return data.result.name;
      });
  }


  public ngOnDestroy(): void {
      this.x.unsubscribe();
  }
}
