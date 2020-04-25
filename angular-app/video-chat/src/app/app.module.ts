import { CallDashModule } from './call-dash/call-dash.module';
import { LoginModule } from './login/login.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    LoginModule,
    CallDashModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
