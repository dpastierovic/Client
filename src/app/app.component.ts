import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { OauthService } from './oauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{
  constructor(private oauthService: OauthService, private activatedRoute: ActivatedRoute, private httpClient: HttpClient) { }
  ngOnInit(): void {  }
  userLoggedIn = false;

  OnLoginButtonClick()
  {
    this.oauthService.Login()
  }
}