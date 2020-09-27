import { Injectable, Output, EventEmitter } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { User } from './user';

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
  @Output() loginChanged = new EventEmitter<User>()
  
  private _loggerInUser : User
  public get loggerInUser() : User{
    return this._loggerInUser
  }

  constructor(private oauthService: OAuthService) { }

  Login(){
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.initImplicitFlow();
  }

  LoginSuccesful(name: string, surname: string, accessToken: string, refreshToken: string, expiresAt: string){
    this._loggerInUser = new User(name, surname, accessToken, refreshToken, expiresAt)
    this.loginChanged.emit(this._loggerInUser)
  }

  LoginFailed(){
    this._loggerInUser = null
    this.loginChanged.emit(this._loggerInUser)
  }
}