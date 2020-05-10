import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StreamsComponent } from 'src/app/components/streams/streams.component';

const routes: Routes = [
  {
    path: 'streams',
    component: StreamsComponent
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
