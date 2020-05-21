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



@NgModule({
  declarations: [StreamsComponent, ToolbarComponent, SideComponent, PostFormComponent, PostsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [StreamsComponent, ToolbarComponent, SideComponent, PostFormComponent ],
  providers: [ TokenService, PostService]
})
export class StreamsModule { }
