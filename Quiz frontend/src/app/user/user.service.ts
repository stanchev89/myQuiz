import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {IUser} from '../interfaces';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }
  register(username,password) {
    const apiUrl = environment.apiUrl;
    return this.http.post<IUser[]>(`${apiUrl}/users/register`,username,password);
  }
}
