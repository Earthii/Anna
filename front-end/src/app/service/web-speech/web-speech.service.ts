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
  final_transcript = '';
  start_callback: Function;
  stop_callback: Function;

  constructor() {
    this.initWebSpeechAPI();
  }

  subscribe(start_callback: Function, stop_callback: Function) {
    this.start_callback = start_callback;
    this.stop_callback = stop_callback;
    this.recognition.start();
  }

  private userStoppedTalking() {
    this.stop_callback(this.final_transcript);
  }

  private initWebSpeechAPI() {
    const { webkitSpeechRecognition }: IWindow = <IWindow>window;
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true; // when the user stops talking, speech recognition will NOT end
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = event => {
      this.start_callback();
      let interim_transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.final_transcript = event.results[i][0].transcript;
          this.userStoppedTalking();
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

    this.recognition.onsoundend = event => {
      delete this.recognition;
      console.log('reset webkitSpeechRecognition');
      this.initWebSpeechAPI();
      this.recognition.start();
    };
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
