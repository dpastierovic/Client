import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './login/login.component';
import { InterceptorService } from './services/interceptor.service';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { PagingComponent } from './paging/paging.component';
import { FormsModule } from '@angular/forms';
import { MarkersComponent } from './markers/markers.component';
import { UpdateComponent } from './update/update.component';
import { HintButtonComponent } from './elements/hint-button/hint-button.component';

@NgModule({
  declarations: [
    ActivityListComponent,
    AppComponent,
    LoginComponent,
    MarkersComponent,
    PagingComponent,
    RoutingComponents,
    UpdateComponent,
    HintButtonComponent
  ],
  imports: [
    BrowserModule,    
    OAuthModule.forRoot(),
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent],
  entryComponents: [HintButtonComponent]
})
export class AppModule { }
