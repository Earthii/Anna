import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WasteWizardService {
  url = 'http://localhost:3000/api/waste-wizard';

  constructor(private http: HttpClient) {}

  analyze(sentence) {
    const params = new HttpParams().set('sentence', sentence);
    return this.http.get(this.url, { params: params });
  }
}
