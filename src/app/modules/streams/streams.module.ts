import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from 'src/app/components/streams/streams.component';
import { TokenService } from 'src/app/services/token.service';
import { ToolbarComponent } from 'src/app/components/toolbar/toolbar.component';
import { SideComponent } from 'src/app/components/side/side.component';
import { PostFormComponent } from '../../components/post-form/post-form.component';
import { PostsComponent } from '../../components/posts/posts.component';
import { PostService } from 'src/app/services/post.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentsComponent } from 'src/app/components/comments/comments.component';
import { PeopleComponent } from 'src/app/components/people/people.component';
import { UsersService } from 'src/app/services/users.service';
import { FollowingComponent } from '../../components/following/following.component';
import { FollowersComponent } from '../../components/followers/followers.component';
import { NotificationsComponent } from '../../components/notifications/notifications.component';
import { TopStreamsComponent } from '../../components/top-streams/top-streams.component';
import { ChatComponent } from '../../components/chat/chat.component';
import { MessageComponent } from '../../components/message/message.component';
import { MessageService } from 'src/app/services/message.service';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiPickerModule } from 'ng2-emoji-picker';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { ChatModule } from '../chat/chat.module';
import { ImagesComponent } from '../../components/images/images.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ViewUserComponent } from '../../components/view-user/view-user.component';

@NgModule({
  declarations: [StreamsComponent, ToolbarComponent, SideComponent, PostFormComponent, PostsComponent, CommentsComponent, PeopleComponent, FollowingComponent, FollowersComponent, NotificationsComponent, TopStreamsComponent, ChatComponent, MessageComponent, ImagesComponent, ViewUserComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    PickerModule,
    FileUploadModule,
    EmojiPickerModule.forRoot(),
  ],
  exports: [StreamsComponent, ToolbarComponent, SideComponent, PostFormComponent, CommentsComponent, PeopleComponent, FollowingComponent, FollowersComponent, NotificationsComponent, ChatComponent, MessageComponent],
  providers: [TokenService, PostService, UsersService, MessageService]
})
export class StreamsModule { }
