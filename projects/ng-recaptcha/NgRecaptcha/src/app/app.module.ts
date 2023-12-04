import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecaptchaComponent } from './components/recaptcha/recaptcha.component';
import { NgModule } from '@angular/core';
import { RecaptchaService } from './services/recaptcha-service.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RecaptchaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  exports: [
    RecaptchaComponent
  ],
  providers: [
    RecaptchaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
