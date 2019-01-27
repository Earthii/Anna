import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatsonService {
  // url = 'https://anna-2019.herokuapp.com/api/watson';
  url = 'http://localhost:3000/api/watson';

  constructor(private http: HttpClient) {}

  analyze(sentence) {
    const params = new HttpParams().set('sentence', sentence);
    return this.http.get(this.url, { params: params });
  }
}
