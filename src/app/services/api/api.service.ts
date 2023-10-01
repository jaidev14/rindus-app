import { Injectable } from '@angular/core';
import { AppConfig } from '../../app-config';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private appConfig: AppConfig
  ) { }

  get(path: string, options?: object) {
    const url = this.getRequestUrl(path);
    return fetch(url)
      .then((response) => response.json());
  }

  post(path: string, body?: any, options?: object) {
    const url = this.getRequestUrl(path);

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  put(path: string, body?: any, options?: object) {
    const url = this.getRequestUrl(path);

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  delete(path: string, body?: any, options?: object) {
    const url = this.getRequestUrl(path);

    fetch(url, {
      method: 'DELETE',
    });
  }

  getRequestUrl(path: string) {
    return this.appConfig.apiEndpoint + path.replace(/^\//, '');
  }

}
