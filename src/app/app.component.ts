import { Component, OnInit} from '@angular/core';
import { Injectable, ViewChild } from '@angular/core';
import { OauthService } from './login/oauth.service';
import { User } from './login/user'
import { errorArrivedEvent } from './services/interceptor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent implements OnInit{
  @ViewChild('openModalButton', {static: false}) modal;

  userLoggedIn : User = null
  error: string = ''

  constructor(private oauthService: OauthService) {  }

  ngOnInit(): void {
    this.userLoggedIn = this.oauthService.loggedInUser
    this.oauthService.loginChanged.subscribe(userLoggedIn => {
      this.userLoggedIn = userLoggedIn
    })

    errorArrivedEvent.subscribe(error => {
      this.error = error
      this.modal.nativeElement.click();
    })
  }

  OnLoginButtonClick()  {
    this.oauthService.Login()
  }

  OnLogoutButtonClick() {
    this.oauthService.Logout()
  }
}