import { Component, OnInit } from '@angular/core';

import { DataService } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css','./loading.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What needs to be done?0.0';
  todos: any[] = [];
  todo = '';
  filterType = 'All';
  toggleAll = false;
 
  constructor(private dataSvc : DataService){}
  
  ngOnInit(){
    this.dataSvc.getTodos().subscribe(data => this.todos = data);
  }
  addTodo(){
    let newTodos = [...this.todos];
    newTodos.push({
      text :this.todo,
      done : false
    });
    this.dataSvc.saveTodos(newTodos).subscribe(data =>{
      this.todos = data;
      this.todo = '';
    })
  }
  clearCompleted(){
    let newTodos = this.todos.filter(item =>(!item.done));
    this.dataSvc.saveTodos(newTodos).subscribe(data => this.todos = data);
  }
  filterChange(filterType : string){
    this.filterType = filterType;
  }
  toggleAllChanged(value : boolean){
    let newTodos = [...this.todos];
    newTodos.forEach(item => item.done = value); //forEach 到底怎麼可不可以用來賦予值 不確定
    this.dataSvc.saveTodos(newTodos).subscribe(data=> this.todos = data );
  }
  updateToggleAllState(){
    this.toggleAll = this.todos.filter(item => (!item.done)).length === 0;
    
    let newTodos = [...this.todos];
    this.dataSvc.saveTodos(newTodos).subscribe(data=> this.todos = data );
  }
  removeTodo(todo){
    let newTodos = [...this.todos];
    newTodos.splice(this.todos.indexOf(todo),1);
    this.dataSvc.saveTodos(newTodos).subscribe(data=> this.todos = data);
  }
}
