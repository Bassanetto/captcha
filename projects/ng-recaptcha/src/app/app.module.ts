import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReCaptchaComponent } from './components/re-captcha/re-captcha.component';
import { ReCaptcha2Component } from './lib/components/recaptcha-v2.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReCaptchaService } from './lib/services/recaptcha.service';

@NgModule({
  declarations: [
    AppComponent,
    ReCaptchaComponent,
    ReCaptcha2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule 
  ],
  exports: [
    ReCaptcha2Component
  ],
  providers: [
    ReCaptchaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
