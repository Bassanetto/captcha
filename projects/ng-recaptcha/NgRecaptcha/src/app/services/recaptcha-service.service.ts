// service-formulario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VerificarRecaptchaRequest } from '../models/verificar-recaptcha-request';

@Injectable({
  providedIn: 'root',
})
export class RecaptchaService {
  private apiUrl = 'http://localhost:5245/api/captcha';
  

  constructor(private http: HttpClient) { }

  verificarRecaptcha(request: VerificarRecaptchaRequest) {
    console.log('Resposta do reCAPTCHA:', request);

    return this.http.post(`${this.apiUrl}/verificar-recaptcha`, request).pipe(o => o);
  }
}