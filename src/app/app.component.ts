import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { ActivatedRoute } from '@angular/router';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://www.strava.com/api/v3/oauth/authorize',
  loginUrl: 'https://www.strava.com/api/v3/oauth/authorize',
  oidc: false,
  redirectUri: window.location.origin,
  clientId: '41746',
  responseType: 'code',
  scope: 'activity:write,read',
  showDebugInformation: true,
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{
  constructor(private oauthService: OAuthService, private activatedRoute: ActivatedRoute) {

    console.log('ouch')
  }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
    })
  }
  title = 'GpsClient';

  OnClickMe()
  {
    console.log(this.oauthService.hasValidIdToken())
    this.oauthService.configure(authCodeFlowConfig)
    console.log(this.oauthService.loginUrl)
    this.oauthService.initImplicitFlow();
    console.log('done')
    console.log(this.oauthService.getAccessToken)
  }
}