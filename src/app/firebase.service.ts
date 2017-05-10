import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Injectable()
export class FirebaseService {

  private requestOptions = new RequestOptions({
    headers: new Headers({
    })
  });

  loading = false;
  pagination: any[] = [];
  todos: any[] = [];
  paginationNum: number;


  getLoading() {
    return this.loading;
  }

  constructor(private http: Http) { }

  getPagination() {
    this.loading = true;
    return this.http.get('https://todolist-818df.firebaseio.com/pagination.json', this.requestOptions).map(res => {
      console.log(res.json());
      return res.json();
    }).finally(() => this.loading = false)
      .catch(error => {
        console.log(error);
        return Observable.of<any[]>([]);
      })

  }

  getTodos(num: number) {
    this.loading = true;
    return this.http.get('https://todolist-818df.firebaseio.com/todolist/' + num + '.json', this.requestOptions).map(res => {
      console.log(res.json());
      return res.json();
    }).finally(() => this.loading = false)
      .catch(error => {
        console.log(error);
        return Observable.of<any[]>([]);
      })
  }
  saveTodos(newTodo) {
    newTodo = { text: newTodo, done: false };
    this.loading = true;
    return this.http.post('https://todolist-818df.firebaseio.com/todolist/' + this.paginationNum + '/todos.json', newTodo, this.requestOptions).map(res => {
      // return this.http.post('./me/todomvc', newTodos, this.requestOptions).map(res => {
      return res.json();
    }).finally(() => this.loading = false)
      .catch(error => {
        console.log(error);
        return Observable.of<any[]>([]);
      });
  }


}
