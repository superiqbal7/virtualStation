import { CommentsComponent } from './../../components/comments/comments.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from 'src/app/components/streams/streams.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { PeopleComponent } from 'src/app/components/people/people.component';
import { FollowingComponent } from 'src/app/components/following/following.component';
import { FollowersComponent } from 'src/app/components/followers/followers.component';
import { NotificationsComponent } from 'src/app/components/notifications/notifications.component';
import { ChatComponent } from 'src/app/components/chat/chat.component';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { ImagesComponent } from 'src/app/components/images/images.component';
import { ViewUserComponent } from 'src/app/components/view-user/view-user.component';

const routes: Routes = [
  {
    path: 'chat/:name',
    component: HomepageComponent,
  },
  {
    path: 'streams',
    component: StreamsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'post/:id',
    component: CommentsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people',
    component: PeopleComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people/following',
    component: FollowingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'people/followers',
    component: FollowersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'chat/:name',
  //   component: ChatComponent,
  //   canActivate: [AuthGuard]
  // }
  {
    path: 'images/:name',
    component: ImagesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: ':name',
    component: ViewUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo:'streams'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class StreamsRoutingModule { }
