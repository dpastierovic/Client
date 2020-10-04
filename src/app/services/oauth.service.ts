import { Injectable, Output, EventEmitter } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { User } from '../login/user';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://www.strava.com/api/v3/oauth/authorize',
  loginUrl: 'https://www.strava.com/api/v3/oauth/authorize',
  oidc: false,
  redirectUri: window.location.origin + '/login',
  clientId: '41746',
  responseType: 'code',
  scope: 'activity:read,read_all',
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
    let name = localStorage.getItem('name')
    let surname = localStorage.getItem('surname')
    let accessToken = localStorage.getItem('accessToken')
    let refreshToken = localStorage.getItem('refreshToken')
    let expiresAt = localStorage.getItem('expiresAt')
    let profilePicture = localStorage.getItem('profilePicture')

    if (name == 'null' || surname == 'null' || accessToken == 'null' || refreshToken == 'null' || expiresAt == 'null' || profilePicture == 'null') {
      return
    }

    this.LoginSuccesful(name, surname, accessToken, refreshToken, expiresAt, profilePicture)
  }

  Login(){
    this.oauthService.configure(authCodeFlowConfig)
    this.oauthService.initImplicitFlow();
  }

  LoginSuccesful(name: string, surname: string, accessToken: string, refreshToken: string, expiresAt: string, profilePicture: string){
    this._loggedInUser = new User(name, surname, accessToken, refreshToken, expiresAt, profilePicture)
    localStorage.setItem('name', name)
    localStorage.setItem('surname', surname)
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('expiresAt', expiresAt)
    localStorage.setItem('profilePicture', profilePicture)
    this.loginChanged.emit(this._loggedInUser)
  }

  LoginFailed(){
    this.Logout()
  }

  Logout()  {
    this._loggedInUser = null
    localStorage.setItem('name', null)
    localStorage.setItem('surname', null)
    localStorage.setItem('accessToken', null)
    localStorage.setItem('refreshToken', null)
    localStorage.setItem('expiresAt', null)
    localStorage.setItem('profilePicture', null)
    this.loginChanged.emit(null)
  }
}