import { Component, OnInit, Output} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OauthService } from './oauth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {

  success = false
  alreadyLoggedIn = false
  response = ''

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private oauthService: OauthService) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.alreadyLoggedIn = false
      this.success = false

      if (this.oauthService.userIsLoggedIn)
      {
        this.response = 'Logout current user if you want to log in again.'
        this.alreadyLoggedIn = true
        return
      }

      if (params['code'] == null || params['scope'] == null) {
        this.success = false
        this.response = 'Strava did not return necessary data.'
        this.oauthService.LoginFailed()
        return;
      }

      if (params['scope'] != 'read,activity:read_all'){
        this.success = false
        this.response = 'Insufficient access scopes granted.'
        this.oauthService.LoginFailed()
        return
      }
      
      this.success = true
      this.response = 'Synchronizing activities.'

      this.httpClient.put('/api/authentication/code', params['code'], { headers: { Accept: 'text/plain' }})
      .subscribe(userData => {
        this.oauthService.LoginSuccesful(userData['FirstName'], userData['LastName'], userData['AccessToken'], userData['RefreshToken'], userData['ExpiresAt'])
      })
    })
  }

  OnRetryButtonClick(){
    this.oauthService.Login()
  }
}