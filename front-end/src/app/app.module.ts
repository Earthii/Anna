import { WatsonService } from './service/watson/watson.service';
import { WebSpeechService } from './service/web-speech/web-speech.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [WebSpeechService, WatsonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
