import { Component, OnInit } from '@angular/core';
import { RecaptchaService } from 'src/app/services/recaptcha-service.service';

declare var grecaptcha: any;

@Component({
  selector: 'app-ng-recaptcha',
  template: `
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>
  <div>
    <div id="meuRecaptcha" (resolved)="onCaptchaResolved($event)"></div>
    <button type="button" (click)="enviarFormulario()">Enviar</button>
  </div>
`,
})
export class RecaptchaComponent implements OnInit {
  private tokenDoRecaptcha: string;

  constructor(private recaptchaService: RecaptchaService) { }

  ngOnInit(): void {
    let reviewRecaptchaWidget: any; // Variável para armazenar a referência ao widget do reCAPTCHA

    var onloadCallback = function () {
      setTimeout(function() {
        grecaptcha.render('meuRecaptcha', {
           'sitekey' : '6LdKUCMpAAAAAARKZVcUcdiRdhBOgGe4CY7ijwL-'
        });
      }, 1000);
    };

    console.log(onloadCallback); // Isso apenas loga a função, não a executa

    // Chame a função onloadCallback para iniciar o reCAPTCHA
    onloadCallback();

    const recaptchaScript = document.createElement('script');
    recaptchaScript.src = `https://www.google.com/recaptcha/api.js?onload=onloadCallback&render=explicit`;
    recaptchaScript.async = true;
    recaptchaScript.defer = true;

    document.head.appendChild(recaptchaScript);
  }

  onCaptchaResolved(captchaResponse: string): void {
    // Faça algo com a resposta do reCAPTCHA, como enviar para o servidor
    console.log('Resposta do reCAPTCHA:', captchaResponse);

    this.tokenDoRecaptcha = captchaResponse;
    // Agora você pode enviar a resposta para o backend
    this.recaptchaService.verificarRecaptcha(captchaResponse)
      .subscribe((resposta) => {
        console.log(resposta)
      });
  }

  enviarFormulario(): void {
    //  Agora você pode usar this.tokenDoRecaptcha para enviar o token junto com os dados do formulário
    const dadosDoFormulario = {/* Seus dados do formulário aqui */ };

    this.recaptchaService.enviarFormulario(dadosDoFormulario, this.tokenDoRecaptcha)
      .subscribe(
        (resposta) => {
          console.log('Formulário enviado com sucesso:', resposta);
          //      Lógica adicional, se necessário
        },
        (erro) => {
          console.error('Erro ao enviar o formulário:', erro);
          //      Lógica para lidar com o erro, se necessário
        }
      );
  }
}
