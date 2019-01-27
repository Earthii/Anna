import { HttpClient, HttpParams } from '@angular/common/http';
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
  url = 'http://localhost:3000/api/category';
  type = '';
  itemName = '';
  invalid = false;
  constructor(
    private webSpeech: WebSpeechService,
    private watson: WatsonService,
    private zone: NgZone,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.webSpeech.subscribe(sentence => {
      this.watson.analyze(sentence).subscribe((data: any) => {
        this.zone.run(() => {
          const keywords = data.keywords;
          const filteredKeywords = keywords.filter(item => {
            return item.text.toLowerCase() !== 'anna';
          });
          this.itemName = filteredKeywords[0].text;
          const params = new HttpParams().set('item', filteredKeywords[0].text);
          this.http.get(this.url, { params: params }).subscribe((res: any) => {
            if (res.category === false) {
              this.type = '';
              this.itemName = '';
              this.invalid = true;
            } else {
              this.invalid = false;
              this.type = res.category;
            }
          });
        });
      });
    });
  }
}
