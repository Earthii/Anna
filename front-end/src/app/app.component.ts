import { WebSpeechService } from './service/web-speech/web-speech.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Anna';

  constructor(private webSpeech: WebSpeechService) {}

  ngOnInit() {
    this.webSpeech.toggle();
  }
}
