import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import io from 'socket.io-client';
import * as moment from 'moment';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit {
  toolbarElement: any;
  socket: any;

  commentForm: FormGroup;
  postId: any;
  commentsArray = [];
  post: string;

  constructor(
    private formbuilder: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute
  ) {
    this.socket = io('http://localhost:3000')
   }

  ngOnInit() {
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
      //console.log(" okay ", data);
      this.post = data.post.post;
      this.commentsArray = data.post.comments.reverse();
      //console.log(this.commentsArray);
    })
  }

  TimeFromNow(time) {
    return moment(time).fromNow();
  }

}