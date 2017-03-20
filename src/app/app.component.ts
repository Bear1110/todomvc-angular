import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  inputHint = 'What needs to be done?0.0';
  todos: any[] = [];
  todo = '';
  filterType = 'All';
  toggleAll = false;

  addTodo(){
    this.todos.push({
      text :this.todo,
      done : false
    });
    this.todo = '';
  }
  clearCompleted(){
    this.todos = this.todos.filter(item =>(!item.done));
  }
  filterChange(filterType : string){
    this.filterType = filterType;
  }
  toggleAllChanged(value : boolean){
    this.todos.forEach(item => item.done = value);
  }
  updateToggleAllState(){
    this.toggleAll = this.todos.filter(item => (!item.done)).length === 0;
  }
  removeTodo(todo){
    this.todos.splice(this.todos.indexOf(todo),1);
  }
}
