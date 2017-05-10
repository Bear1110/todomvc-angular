import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../data.service";
import { FirebaseService } from "../firebase.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  inputHint = 'What needs to be done? 0__0';


  constructor(private dataSvc: FirebaseService) { }
  @Input() todos: any[];
  @Input() p: any[];
  @Input() filterType: string;
  toggleAll = false;
  todo: string = '';
  ngOnInit() { }

  addTodo() {
    this.dataSvc.saveTodos(this.todo).subscribe(data => {
      console.log(data);
      // this.todos = data[this.dataSvc.paginationNum].todos;
      // this.todo = '';
    })
  }
  toggleAllChanged(value: boolean) {
    this.p[this.dataSvc.paginationNum].todos.forEach(item => item.done = value); //forEach 到底怎麼可不可以用來賦予值 不確定
    this.dataSvc.saveTodos(this.p).subscribe(data => this.todos = data[this.dataSvc.paginationNum].todos);
  }
  updateToggleAllState() {
    this.p[this.dataSvc.paginationNum].todos = [...this.todos];
    this.dataSvc.saveTodos(this.p).subscribe(data => this.todos = data[this.dataSvc.paginationNum].todos);
    this.toggleAll = this.p[this.dataSvc.paginationNum].todos.filter(item => (!item.done)).length === 0;
  }
  removeTodo(todo) {
    this.p[this.dataSvc.paginationNum].todos.splice(this.todos.indexOf(todo), 1);
    this.dataSvc.saveTodos(this.p).subscribe(data => this.todos = data[this.dataSvc.paginationNum].todos);
  }

}
