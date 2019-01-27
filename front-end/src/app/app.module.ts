import { WasteWizardService } from './service/waste-wizard/waste-wizard.service';
import { WebSpeechService } from './service/web-speech/web-speech.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [WebSpeechService, WasteWizardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
