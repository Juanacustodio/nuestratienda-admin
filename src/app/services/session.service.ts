import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import * as _ from 'lodash';

@Injectable()
export class SessionService {
  token: string;

  constructor(private cookies: CookieService) {
    this.token = '';
  }

  setSessionToken(token: string): void {
    if (_.isEmpty(this.getSessionToken())) {
      this.cookies.set('session-token', token);
    }
  }

  getSessionToken(): string {
    if (_.isEmpty(this.token)) {
      this.token = this.cookies.get('session-token');
    }
    return this.token;
  }

  getFirebaseJsonConfig(): string {
    return JSON.parse(this.cookies.get('firestoreConfig'));
  }

  deleteSession(): void {
    this.cookies.deleteAll();
    this.cookies.deleteAll('/');
    this.cookies.deleteAll('/admin');
  }
}
