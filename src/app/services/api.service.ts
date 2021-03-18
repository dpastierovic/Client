import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OauthService } from './oauth.service';
import { MarkerPost } from '../entities/markerPost';
import { Marker } from '../entities/marker';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Activity } from '../entities/activity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient, private oauthService: OauthService) { }

  getStats() {
    return this.httpClient.get('/api/authentication/stats/32565276', { headers: { token: localStorage.getItem('accessToken')}})
  }

  getCode(code: string) {
    return this.httpClient.put('/api/authentication/code', code, { headers: { Accept: 'text/plain' }})
  }

  getActivities(page: number, perPage: number) : Observable<Activity[]>{
    return this.httpClient.get('/api/activity/activities', { headers: { token: localStorage.getItem('accessToken'), page: `${page}`, perPage: `${perPage}` }})
    .pipe(map(activities => {
      let output = new Array<Activity>();      
      (activities as Object[]).forEach(activity => {
        output.push(new Activity(activity['athlete']['id'], activity['name'], activity['map']['summary_polyline'], activity['start_date_local'], false));
      });
      return output;
    }))
  }

  getMarkers() {
    return this.httpClient.get('/api/marker/markers/' + '32565276', { headers: { token: localStorage.getItem('accessToken')}})
  }

  addMarker(marker: Marker){
    let markerPost = new MarkerPost()
    markerPost.latitude = marker.latitude
    markerPost.longitude = marker.longitude
    markerPost.name = marker.name
    markerPost.radius = marker.radius
    return this.httpClient.post('/api/marker/add/' + '32565276', markerPost)
  }

  removeMarker(marker: Marker){
    return this.httpClient.delete('/api/marker/delete/' + '32565276' + '/' + marker.id);
  }

  lastUpdate(): Observable<Object> {
    return this.httpClient.get('/api/activity/lastUpdate/' + this.oauthService.loggedInUser.id);
  }
}
