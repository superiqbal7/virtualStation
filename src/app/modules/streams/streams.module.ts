import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StreamsComponent } from 'src/app/components/streams/streams.component';
import { TokenService } from 'src/app/services/token.service';



@NgModule({
  declarations: [StreamsComponent],
  imports: [
    CommonModule,
  ],
  exports: [ StreamsComponent ],
  providers: [ TokenService]
})
export class StreamsModule { }
