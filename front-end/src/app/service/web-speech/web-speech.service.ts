import { Injectable } from '@angular/core';

interface IWindow extends Window {
  webkitSpeechRecognition: any;
  SpeechRecognition: any;
}

@Injectable({
  providedIn: 'root'
})
export class WebSpeechService {
  recognition = null;
  final_transcript: string;
  callback: Function;

  constructor() {
    const { webkitSpeechRecognition }: IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true; // when the user stops talking, speech recognition will NOT end
    this.recognition.interimResults = true;

    this.recognition.onresult = event => {
      let interim_transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.final_transcript = event.results[i][0].transcript;
          setTimeout(() => {
            this.userStoppedTalking();
          }, 1000);
        } else {
          interim_transcript += event.results[i][0].transcript;
        }
      }
      this.final_transcript = this.capitalize(this.final_transcript);

      const interim_span = document.getElementById('interim_span');
      const final_span = document.getElementById('final_span');

      final_span.innerHTML = this.linebreak(this.final_transcript);
      interim_span.innerHTML = this.linebreak(interim_transcript)
        ? this.linebreak(interim_transcript)
        : 'Listening...';
    };
  }

  subscribe(callback: Function) {
    this.callback = callback;

    this.final_transcript = '';
    this.recognition.lang = 'en-US';
    this.recognition.start();
  }

  private userStoppedTalking() {
    // this.recognition.stop();
    this.callback(this.final_transcript);
  }

  private capitalize(s) {
    const first_char = /\S/;
    return s.replace(first_char, function(m) {
      return m.toUpperCase();
    });
  }

  private linebreak(s) {
    const two_line = /\n\n/g;
    const one_line = /\n/g;
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
  }
}
