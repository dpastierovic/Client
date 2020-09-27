import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://www.strava.com/api/v3/oauth/authorize',
  loginUrl: 'https://www.strava.com/api/v3/oauth/authorize',
  oidc: false,
  redirectUri: window.location.origin + '/login',
  clientId: '41746',
  responseType: 'code',
  scope: 'activity:read_all',
  showDebugInformation: true,
  tokenEndpoint: 'https://www.strava.com/api/v3/oauth/token',
  customQueryParams: {approval_prompt : 'auto'}
};

@Injectable({
  providedIn: 'root'
})

export class OauthService {

  constructor(private oauthService: OAuthService) { }

  Login(){
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.initImplicitFlow();
  }
}