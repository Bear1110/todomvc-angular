import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers} from '@angular/http'
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  private requestOptions = new RequestOptions({
    headers : new Headers({
      'authorization' : 'token 5e1356f3-4249-40ac-8201-91e6712485b4'
    })
  });

  constructor(private http: Http) { }

  getTodos(){
    return this.http.get('./me/todomvc',this.requestOptions).map(res => {
      return res.json();
    }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    })
  }
  saveTodos (newTodos : any[]){
    return this.http.post('./me/todomvc', newTodos, this.requestOptions).map(res => {
      return res.json();
    }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    });
  }

}
