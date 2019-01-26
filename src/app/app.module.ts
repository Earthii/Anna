import { WebSpeechService } from './service/web-speech.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [WebSpeechService],
  bootstrap: [AppComponent]
})
export class AppModule {}
