import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MapComponent } from './mapComponents/map/map.component';
import { MarkersComponent } from './markers/markers.component';
import { UpdateComponent } from './update/update.component';


const routes: Routes = [
  { path: 'activity-list', component: ActivityListComponent },
  { path: 'markers', component: MarkersComponent },
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map-component', component: MapComponent },
  { path: 'update', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  LoginComponent,
  MapComponent
]