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
  
  private _loggedInUser : User
  public get loggedInUser() : User{
    return this._loggedInUser
  }

  public get userIsLoggedIn() : Boolean{
    return this._loggedInUser != null
  }

  constructor(private oauthService: OAuthService) {
    let name = localStorage.getItem('SEname')
    let surname = localStorage.getItem('SEsurname')
    let accessToken = localStorage.getItem('SEaccessToken')
    let refreshToken = localStorage.getItem('SErefreshToken')
    let expiresAt = localStorage.getItem('SEexpiresAt')

    if(name == 'null' || surname == 'null' || accessToken == 'null' || refreshToken == 'null' || expiresAt == 'null') {
      return
    }

    this.LoginSuccesful(name, surname, accessToken, refreshToken, expiresAt)
  }

  Login(){
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.initImplicitFlow();
  }

  LoginSuccesful(name: string, surname: string, accessToken: string, refreshToken: string, expiresAt: string){
    this._loggedInUser = new User(name, surname, accessToken, refreshToken, expiresAt)
    localStorage.setItem('SEname', name)
    localStorage.setItem('SEsurname', surname)
    localStorage.setItem('SEaccessToken', accessToken)
    localStorage.setItem('SErefreshToken', refreshToken)
    localStorage.setItem('SEexpiresAt', expiresAt)
    this.loginChanged.emit(this._loggedInUser)
  }

  LoginFailed(){
    this.Logout()
  }

  Logout()  {
    this._loggedInUser = null
    localStorage.setItem('SEname', null)
    localStorage.setItem('SEsurname', null)
    localStorage.setItem('SEaccessToken', null)
    localStorage.setItem('SErefreshToken', null)
    localStorage.setItem('SEexpiresAt', null)
    this.loginChanged.emit(null)
  }
}