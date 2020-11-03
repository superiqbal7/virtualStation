import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomepageComponent } from 'src/app/components/homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxAutoScrollModule } from 'ngx-auto-scroll';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { EmojiPickerModule } from 'ng2-emoji-picker';
import { StreamsModule } from '../streams/streams.module';

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    CommonModule,
    StreamsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    NgxAutoScrollModule,
    PickerModule,
    EmojiPickerModule.forRoot()
  ],
  exports:[
    HomepageComponent
  ]
})
export class ChatModule { }
