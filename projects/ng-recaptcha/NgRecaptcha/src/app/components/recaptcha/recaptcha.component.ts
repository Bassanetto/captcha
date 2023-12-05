import { Component, OnInit, NgZone } from '@angular/core';
import { VerificarRecaptchaRequest } from 'src/app/models/verificar-recaptcha-request';
import { RecaptchaService } from 'src/app/services/recaptcha-service.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-ng-recaptcha',
  template: `<div id="recaptcha"></div>`,
})
export class RecaptchaComponent implements OnInit {
  private tokenDoRecaptcha: string;
  request: VerificarRecaptchaRequest;

  constructor(private recaptchaService: RecaptchaService, private zone: NgZone) { }

  ngOnInit(): void {
    this.loadRecaptchaScript();
  }

  loadRecaptchaScript(): void {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window['onloadCallback'] = () => {
        this.zone.run(() => {
          grecaptcha.render('recaptcha', {
            'sitekey': '6LdKUCMpAAAAAARKZVcUcdiRdhBOgGe4CY7ijwL-',
            'callback': (response: string) => this.onCaptchaResolved(response),
          });
        });
      };
    };

    document.head.appendChild(script);
  }

  onCaptchaResolved(captchaResponse: string): void {
    this.tokenDoRecaptcha = captchaResponse;

    this.request = {
      token: captchaResponse
    }

    this.recaptchaService.verificarRecaptcha(this.request).subscribe(
      async res => {
        console.log(res)
      });
  }
}