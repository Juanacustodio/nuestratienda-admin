import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TarjetaCulqui} from '../models';

@Injectable()
export class CulquiService {

  endpoint = 'https://secure.culqi.com';
  bearer = 'pk_test_Kd3gwqwwXEHBBj9r';

  constructor(private http: HttpClient) {}

  private getHeaders(): any {
    let headers = new HttpHeaders();
    headers = headers.set('Content-type', 'application/json');
    headers = headers.set('Authorization', `Bearer ${this.bearer}`);
    return {
      'headers': headers
    };
  }

  generarToken(tarjeta: TarjetaCulqui): any {
    return this.http.post(
      `${this.endpoint}/v2/tokens`,
      tarjeta,
      this.getHeaders()
    );
  }
}
