// service-formulario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  private apiUrl = 'URL_DO_SEU_BACKEND'; // Substitua pela URL do seu backend

  constructor(private http: HttpClient) {}

  verificarRecaptcha(captchaResponse: string): Observable<any> {
    // Faça algo com a resposta do reCAPTCHA, como enviar para o servidor
    console.log('Resposta do reCAPTCHA:', captchaResponse);
  
    // Agora você pode enviar a resposta para o backend
    return this.http.post('/api/verificar-recaptcha', { token: captchaResponse });
  }

  enviarFormulario(dadosDoFormulario: any, tokenDoRecaptcha: string): Observable<any> {
    // Adicione a lógica para enviar os dados para o backend
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      dadosDoFormulario,
      tokenDoRecaptcha,
    };

    return this.http.post(this.apiUrl, body, { headers });
  }
}