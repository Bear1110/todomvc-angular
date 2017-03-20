import { Component, OnInit } from '@angular/core';

import { Http, RequestOptions, Headers} from '@angular/http'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What needs to be done?0.0';
  todos: any[] = [];
  todo = '';
  filterType = 'All';
  toggleAll = false;

  private requestOptions = new RequestOptions({
    headers : new Headers({
      'authorization' : 'token 5e1356f3-4249-40ac-8201-91e6712485b4'
    })
  });

  constructor(private http :Http){
  }
  ngOnInit(){
    this.getTodos().subscribe(data => {
      this.todos = data;
    })
  }
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
      this.todos = res.json();
    }).catch(error => {
      console.log(error);
      return Observable.of<any[]>([]);
    });
  }

  addTodo(){
    let newTodos = [...this.todos];
    newTodos.push({
      text :this.todo,
      done : false
    });
    this.saveTodos(newTodos).subscribe(data =>{
      this.todo = '';
    })
  }
  clearCompleted(){
    let newTodos = this.todos.filter(item =>(!item.done));
    this.saveTodos(newTodos).subscribe(data =>{
      console.log(data);
    })
  }
  filterChange(filterType : string){
    this.filterType = filterType;
  }
  toggleAllChanged(value : boolean){
    let newTodos = [...this.todos];
    newTodos.forEach(item => item.done = value);
    this.saveTodos(newTodos).subscribe(data=>{});
  }
  updateToggleAllState(){
    this.toggleAll = this.todos.filter(item => (!item.done)).length === 0;
    this.saveTodos(this.todos).subscribe(data=>{});
  }
  removeTodo(todo){
    let newTodos = [...this.todos];
    newTodos.splice(this.todos.indexOf(todo),1);
    this.saveTodos(newTodos).subscribe(data=>{});
  }
}
