import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  inputHint = 'What needs to be done? 0__0';


  constructor(private dataSvc: DataService) { }
  @Input() todos: any[];
  @Input() pNum: number;
  @Input() p: any[];
  @Input() filterType: string;
  toggleAll = false;
  todo: string = '';
  ngOnInit() { }

  addTodo() {
    this.p[this.pNum].todos.push({
      text: this.todo,
      done: false
    });
    this.dataSvc.saveTodos(this.p).subscribe(data => {
      this.todos = data[this.pNum].todos;
      this.todo = '';
    })
  }
  toggleAllChanged(value: boolean) {
    this.p[this.pNum].todos.forEach(item => item.done = value); //forEach 到底怎麼可不可以用來賦予值 不確定
    this.dataSvc.saveTodos(this.p).subscribe(data => this.todos = data[this.pNum].todos);
  }
  updateToggleAllState() {
    this.p[this.pNum].todos = [...this.todos];
    this.dataSvc.saveTodos(this.p).subscribe(data => this.todos = data[this.pNum].todos);
    this.toggleAll = this.p[this.pNum].todos.filter(item => (!item.done)).length === 0;
  }
  removeTodo(todo) {
    this.p[this.pNum].todos.splice(this.todos.indexOf(todo), 1);
    this.dataSvc.saveTodos(this.p).subscribe(data => this.todos = data[this.pNum].todos);
  }

}
