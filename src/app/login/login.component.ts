import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { OauthService } from '../services/oauth.service';
import { ApiService } from '../services/api.service';

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

  constructor(private activatedRoute: ActivatedRoute, private stravaApi: ApiService, private oauthService: OauthService, private router: Router) { }

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
        setTimeout(() => { this.router.navigate(['activity-list']) }, 1500)
        return
      }

      if (params['code'] == null || params['scope'] == null) {
        this.failure = true
        this.response = 'Strava did not return necessary data.'
        this.oauthService.LoginFailed()
        return;
      }

      if (params['scope'] != 'read,activity:read,read_all'){
        console.log(params['scope'])
        this.failure = true
        this.response = 'Insufficient access scopes granted.'
        this.oauthService.LoginFailed()
        return
      }
      
      this.connecting = true
      this.response = 'Connecting to the server...'      
      
      this.stravaApi.getCode(params['code']).subscribe(userData => {
        this.success = true
        this.connecting = false
        this.response = 'Connected.'
        this.oauthService.LoginSuccesful(userData['FirstName'], userData['LastName'], userData['AccessToken'],
          userData['RefreshToken'], userData['ExpiresAt'], userData['ProfilePicture'])
      })
    })
  }

  OnRetryButtonClick(){
    this.oauthService.Login()
  }
}