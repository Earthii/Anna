import { WasteWizardService } from './service/waste-wizard/waste-wizard.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { WebSpeechService } from './service/web-speech/web-speech.service';
import { Component, OnInit, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Anna';
  type = '';
  itemName = '';
  constructor(
    private webSpeech: WebSpeechService,
    private wasteWizard: WasteWizardService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.webSpeech.subscribe(sentence => {
      this.wasteWizard
        .analyze(sentence)
        .subscribe((data: { category: any; item: string }) => {
          this.zone.run(() => {
            if (data.category === false) {
              this.type = '';
              this.itemName = 'Sorry, no results were found';
            } else {
              this.type = data.category;
              this.itemName = data.item;
            }
          });
        });
    });
  }
}
