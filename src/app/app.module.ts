import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { HttpClientModule } from '@angular/common/http'
import { ApiClientService } from './apiclient-service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ApiClientService
  ],
  bootstrap: [
    AppComponent, 
    NavigationBarComponent, 
    HomeComponent, 
    PreferencesComponent]
})
export class AppModule { }
