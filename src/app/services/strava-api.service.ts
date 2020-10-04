import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StravaApiService {

  constructor(private httpClient: HttpClient) { }

  getStats() {
    return this.httpClient.get('/api/authentication/stats/32565276', { headers: { token: localStorage.getItem('accessToken')}})
  }
}
