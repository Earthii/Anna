import { WebSpeechService } from './service/web-speech.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Anna';

  constructor(private webSpeech: WebSpeechService) {}

  toggleRecord() {
    this.webSpeech.toggle();
  }
}
