import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TarjetaCulqui} from '../models';
import * as _ from 'lodash';

@Injectable()
export class CulquiService {

  endpoint = 'https://secure.culqi.com';
  bearer = 'pk_test_Kd3gwqwwXEHBBj9r';
  headers = {};

  constructor(private http: HttpClient) {}

  private getHeaders(): any {
    if (_.isEmpty(this.headers)) {
      let headers = new HttpHeaders();
      headers = headers.set('Content-type', 'application/json');
      headers = headers.set('Authorization', `Bearer ${this.bearer}`);
      this.headers = {
        'headers': headers
      };
    }
    return this.headers;
  }

  generarToken(tarjeta: TarjetaCulqui): any {
    return this.http.post(
      `${this.endpoint}/v2/tokens`,
      tarjeta,
      this.getHeaders()
    );
  }
}
