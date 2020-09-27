import { Injectable, Output, EventEmitter } from '@angular/core';
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
  @Output() loginChanged = new EventEmitter<Boolean>()
  
  private _userLoggedIn : Boolean
  public get userLoggedIn() : Boolean{
    return this._userLoggedIn
  }

  constructor(private oauthService: OAuthService) { }

  Login(){
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.initImplicitFlow();
  }

  LoginSuccesful(){
    this._userLoggedIn = true
    this.loginChanged.emit(this.userLoggedIn)
  }

  LoginFailed(){
    this._userLoggedIn = false
    this.loginChanged.emit(this.userLoggedIn)
  }
}