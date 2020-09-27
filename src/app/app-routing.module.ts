import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AddMarkerComponent } from './mapComponents/add-Marker/add-Marker.component';
import { MapComponent } from './mapComponents/map/map.component';


const routes: Routes = [
  { path: 'home', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'map-component', component: MapComponent },
  { path: 'add-marker', component: AddMarkerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [
  LoginComponent,
  MapComponent,
  AddMarkerComponent
]