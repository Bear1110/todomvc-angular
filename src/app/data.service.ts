import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http'
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  private requestOptions = new RequestOptions({
    headers: new Headers({
      'authorization': 'token 5e1356f3-4249-40ac-8201-91e6712485b4'
    })
  });
  loading = false;

  constructor(private http: Http) { }

  getTodos() {
    this.loading = true;
    return this.http.get('https://jsonbin.org/me/todomvc', this.requestOptions).map(res => {
      return res.json();
    }).finally(() => this.loading = false)
      .catch(error => {
        console.log(error);
        return Observable.of<any[]>([]);
      })
  }
  saveTodos(newTodos: any[]) {
    this.loading = true;
    return this.http.post('https://jsonbin.org/me/todomvc', newTodos, this.requestOptions).map(res => {
      // return this.http.post('./me/todomvc', newTodos, this.requestOptions).map(res => {
      return res.json();
    }).finally(() => this.loading = false)
      .catch(error => {
        console.log(error);
        return Observable.of<any[]>([]);
      });
  }

}
