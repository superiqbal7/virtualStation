import { TokenInterceptor } from './services/token-interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth/auth.module';
import { AuthRoutingModule } from './modules/auth-routing/auth-routing.module';
import { StreamsModule } from './modules/streams/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing/streams-routing.module';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmojiFrequentlyService, PickerModule } from '@ctrl/ngx-emoji-mart';
import { ChatModule } from './modules/chat/chat.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AuthRoutingModule,
    StreamsModule,
    StreamsRoutingModule,
    PickerModule,
    ChatModule
  ],
  providers: [CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    EmojiFrequentlyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
