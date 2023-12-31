import { Component, forwardRef, Injector, Input, NgZone, OnChanges, Renderer2, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ReCaptchaType } from '../models/recaptcha-type.enum';
import { BaseReCaptchaComponent } from './base-recaptcha.component';
import { ReCaptchaService } from '../services/recaptcha.service';

@Component({
  selector: 'invisible-recaptcha',
  template: `
  <div #captchaWrapperElem></div>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InvisibleReCaptchaComponent),
      multi: true,
    }
  ]
})
export class InvisibleReCaptchaComponent extends BaseReCaptchaComponent implements OnChanges {

  /**
   * This size representing invisible captcha
   */
  protected readonly size = 'invisible';

  /**
   * Theme
   */
  @Input() theme: 'dark' | 'light' = 'light';

  /**
   * Badge
   */
  @Input() badge: 'bottomright' | 'bottomleft' | 'inline' = 'bottomright';

  /**
   * Language code. Auto-detects the user's language if unspecified.
   */
  @Input() hl: string;

  protected recaptchaType: ReCaptchaType = ReCaptchaType.InvisibleReCaptcha;

  constructor(
    protected renderer: Renderer2,
    protected zone: NgZone,
    protected injector: Injector,
    protected recaptchaService: ReCaptchaService
  ) {
    super(renderer, zone, injector, recaptchaService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  /**
   * Programatically invoke the reCAPTCHA check. Used if the invisible reCAPTCHA is on a div instead of a button.
   */
  execute(): void {
    // execute captcha
    this.zone.runOutsideAngular(() => this.reCaptchaApi.execute(this.captchaId));
  }

  protected captchaSpecificSetup(): void {
  }

  /**
  * Gets reCaptcha properties
  */
  protected getCaptchaProperties(): any {
    return {
      'sitekey': this.siteKey,
      'callback': (response) => this.zone.run(() => this.handleCallback(response)),
      'expired-callback': () => this.zone.run(() => this.handleExpireCallback()),
      'error-callback': () => this.zone.run(() => this.handleErrorCallback()),
      'badge': this.badge,
      'type': this.type,
      'tabindex': this.tabIndex,
      'size': this.size,
      'theme': this.theme
    };
  }


}

