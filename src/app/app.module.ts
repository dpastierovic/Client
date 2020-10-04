import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './login/login.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { InterceptorService } from './services/interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    LoginComponent
  ],
  imports: [
    BrowserModule,    
    OAuthModule.forRoot(),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
