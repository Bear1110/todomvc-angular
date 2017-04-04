import { Component, OnInit, Input } from '@angular/core';
import { DataService } from "../data.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private dataSvc: DataService) { }

  @Input() todos: any[];

  ngOnInit() {
  }
  addTodo() {
    // let newP = [...this.pagination];
    // newP[this.paginationNum].todos.push({
    //   text: this.todo,
    //   done: false
    // });
    // this.dataSvc.saveTodos(newP).subscribe(data => {
    //   this.todos = data[this.paginationNum].todos;
    //   this.todo = '';
    // })
  }
  clearCompleted() {
    // let newTodos = this.todos.filter(item => (!item.done));
    // this.pagination[this.paginationNum].todos = newTodos;
    // this.dataSvc.saveTodos(this.pagination).subscribe(data => this.todos = data[this.paginationNum].todos);
  }
  filterChange(filterType: string) {
    // this.filterType = filterType;
  }
  toggleAllChanged(value: boolean) {
    // let newPagination = [...this.pagination];
    // newPagination[this.paginationNum].todos.forEach(item => item.done = value); //forEach 到底怎麼可不可以用來賦予值 不確定
    // this.dataSvc.saveTodos(newPagination).subscribe(data => this.todos = data[this.paginationNum].todos);
  }
  updateToggleAllState() {
    // this.pagination[this.paginationNum].todos = [...this.todos];
    // this.dataSvc.saveTodos(this.pagination).subscribe(data => this.todos = data[this.paginationNum].todos);
    // this.toggleAll = this.pagination[this.paginationNum].todos.filter(item => (!item.done)).length === 0;
  }
  removeTodo(todo) {
    // let newPagination = [...this.pagination];
    // newPagination[this.paginationNum].todos.splice(this.todos.indexOf(todo), 1);
    // this.dataSvc.saveTodos(newPagination).subscribe(data => this.todos = data[this.paginationNum].todos);
  }

}
