import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://www.strava.com/api/v3/oauth/authorize',
  loginUrl: 'https://www.strava.com/api/v3/oauth/authorize',
  oidc: false,
  redirectUri: window.location.origin,
  clientId: '41746',
  responseType: 'code',
  scope: 'activity:read_all',
  showDebugInformation: true,
  tokenEndpoint: 'https://www.strava.com/api/v3/oauth/token',
  customQueryParams: {approval_prompt : 'auto'}
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{
  constructor(private oauthService: OAuthService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['code'] == null) {
        console.log('eeeeempty')
        return;
      }
      console.log(params)
      this.httpClient.put('/api/authentication/code', params['code'], { headers: { Accept: 'text/plain' }})
      .subscribe(_ => {
        this.token = _
        console.log(_)})
    })
  }
  title = 'GpsClient';
  authorized = false;
  token;

  OnClickMe()
  {
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.initImplicitFlow();
  }

  OnTokenButton()
  {
    console.log(this.authorized)
    console.log(this.token)
  }

  OnGetActivities()
  {
    console.log(this.token)
    this.httpClient.get('/api/activity/activities', { headers: { access_token: this.token['access_token']} }).subscribe(_ => {console.log(_)})
  }
}