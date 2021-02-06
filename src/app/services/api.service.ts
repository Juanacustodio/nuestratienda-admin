import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Usuario} from '../models/usuario';

@Injectable()
export class ApiService {

  endpoint = 'https://nta-admin.herokuapp.com';

  constructor(private http: HttpClient) {
  }

  login(user: Usuario): any {
    return this.http.post(`${this.endpoint}/api/vendedor/login`, user);
  }

}
