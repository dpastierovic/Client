import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InterceptorService } from './interceptor.service';

@Injectable({
  providedIn: 'root'
})
export class StravaApiService {

  constructor(private httpClient: HttpClient) { }

  getStats() {
    return this.httpClient.get('/api/authentication/stats/32565276', { headers: { token: localStorage.getItem('accessToken')}})
  }

  getCode(code: string) {
    return this.httpClient.put('/api/authentication/code', code, { headers: { Accept: 'text/plain' }})
  }

  getActivities(page: number, perPage: number) {
    return this.httpClient.get('/api/activity/activities', { headers: { token: localStorage.getItem('accessToken'), page: `${page}`, perPage: `${perPage}` }})
  }
}
