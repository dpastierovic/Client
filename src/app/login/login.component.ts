import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable()
export class LoginComponent implements OnInit {
  success = false
  response = ''

  constructor(private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['code'] == null || params['scope'] == null) {
        this.success = false
        this.response = 'Strava did not return necessary data.'
        return;
      }

      if (params['scope'] != 'read,activity:read_all'){
        this.success = false
        this.response = 'Insufficient access scopes granted.'
      }
      
      this.success = true
      this.response = 'Synchronizing activities.'

      this.httpClient.put('/api/authentication/code', params['code'], { headers: { Accept: 'text/plain' }})
      .subscribe(_ => {
        console.log(_)})
    })
  }
}