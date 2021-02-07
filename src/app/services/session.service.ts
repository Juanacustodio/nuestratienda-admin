import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import * as _ from 'lodash';

@Injectable()
export class SessionService {
  token: string;

  constructor(private http: HttpClient, private cookies: CookieService) {
    this.token = '';
  }

  setSessionToken(token: string): void {
    this.cookies.set('session-token', token);
  }

  getSessionToken(): string {
    if (_.isEmpty(this.token)) {
      this.token = this.cookies.get('session-token');
    }
    return this.token;
  }

  deleteSession(): void {
    this.cookies.delete('session-token');
  }
}
