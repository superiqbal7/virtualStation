import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from 'src/app/components/streams/streams.component';



@NgModule({
  declarations: [StreamsComponent],
  imports: [
    CommonModule,
  ],
  exports: [ StreamsComponent ]
})
export class StreamsModule { }
