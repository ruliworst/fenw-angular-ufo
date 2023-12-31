import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './components/nav/nav.component';
import { HttpClientModule } from '@angular/common/http'
import { ApiClientService } from './services/apiclient-service';
import { PlayComponent } from './components/play/play.component';
import { AppService } from './services/app-service';
import { AuthService } from './services/auth-service';
import { PreferencesService } from './services/preferences-service';
import { RecordsComponent } from './components/records/records.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    PlayComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ApiClientService,
    AppService,
    AuthService,
    PreferencesService,
  ],
  bootstrap: [
    AppComponent, 
  ]
})
export class AppModule { }
