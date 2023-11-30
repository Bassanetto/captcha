import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-re-captcha',
  templateUrl: './re-captcha.component.html',
  styleUrls: ['./re-captcha.component.css']
})
export class ReCaptchaComponent implements OnInit {
  aFormGroup: FormGroup;

  get siteKey(): string {
    return '6LdQ4BIpAAAAAI2orG_izXEyIeUlv0RxEmQo5Gvv'
  }

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  }

  onSucess($event: any) {
    console.log($event, 'FOI PORRAAAA')
  }

}
