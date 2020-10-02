import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  failure = false
  connecting = false
  alreadyLoggedIn = false
  synchronizing = false
  response = ''

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient, private oauthService: OauthService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.alreadyLoggedIn = false
      this.failure = false
      this.success = false
      this.connecting = false
      this.synchronizing = false

      if (this.oauthService.userIsLoggedIn)
      {
        this.response = 'Logout current user if you want to log in again.'
        this.alreadyLoggedIn = true
        setTimeout(() => { document.location.href = window.location.origin }, 1500)
        return
      }

      if (params['code'] == null || params['scope'] == null) {
        this.failure = true
        this.response = 'Strava did not return necessary data.'
        this.oauthService.LoginFailed()
        return;
      }

      if (params['scope'] != 'read,activity:read_all'){
        this.failure = true
        this.response = 'Insufficient access scopes granted.'
        this.oauthService.LoginFailed()
        return
      }
      
      this.connecting = true
      this.response = 'Connecting to the server...'      

      this.httpClient.put('/api/authentication/code', params['code'], { headers: { Accept: 'text/plain' }})
      .subscribe(userData => {
        this.synchronizing = true
        this.connecting = false
        this.response = 'Synchronizing activities...'
        this.oauthService.LoginSuccesful(userData['FirstName'], userData['LastName'], userData['AccessToken'],
          userData['RefreshToken'], userData['ExpiresAt'], userData['ProfilePicture'])
        this.httpClient.get('/api/activity/activities', { headers: { token: userData['AccessToken'] }}).subscribe(_ => {
          this.synchronizing = false 
          this.success = true
          this.response = 'Activities synchronized.'          
          setTimeout(() => { document.location.href = window.location.origin }, 1500)
        })
      })
    })
  }

  OnRetryButtonClick(){
    this.oauthService.Login()
  }
}