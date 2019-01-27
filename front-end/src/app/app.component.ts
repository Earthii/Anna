import { WebSpeechService } from './service/web-speech/web-speech.service';
import { WatsonService } from './service/watson/watson.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Anna';
  result;
  constructor(
    private webSpeech: WebSpeechService,
    private watson: WatsonService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.webSpeech.subscribe(sentence => {
      this.watson.analyze(sentence).subscribe(data => {
        this.zone.run(() => {
          this.result = data;
        });
        console.log(this.result);
      });
    });
  }
}
