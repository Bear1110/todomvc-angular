import { Component, OnInit } from '@angular/core';

import { DataService } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './loading.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What needs to be done? 0__0';
  todos: any[] = [];
  todo = '';
  filterType = 'All';
  toggleAll = false;
  ///////////////////////for pagination
  paginationName = '';
  paginationNum = 0;
  pagination: any[] = [];
  inputP = false;

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    // this.dataSvc.saveTodos([]).subscribe(data => {
    //   this.todos = data[this.paginationNum].todos;
    //   this.todo = '';
    // });
    this.dataSvc.getTodos().subscribe(data => {
      this.pagination = data
      this.switchP(0);
    });
  }
  addTodo() {
    let newP = [...this.pagination];
    newP[this.paginationNum].todos.push({
      text: this.todo,
      done: false
    });
    this.dataSvc.saveTodos(newP).subscribe(data => {
      this.todos = data[this.paginationNum].todos;
      this.todo = '';
    })
  }
  clearCompleted() {
    let newTodos = this.todos.filter(item => (!item.done));
    this.pagination[this.paginationNum].todos = newTodos;
    this.dataSvc.saveTodos(this.pagination).subscribe(data => this.todos = data[this.paginationNum].todos);
  }
  filterChange(filterType: string) {
    this.filterType = filterType;
  }
  toggleAllChanged(value: boolean) {
    let newPagination = [...this.pagination];
    newPagination[this.paginationNum].todos.forEach(item => item.done = value); //forEach 到底怎麼可不可以用來賦予值 不確定
    this.dataSvc.saveTodos(newPagination).subscribe(data => this.todos = data[this.paginationNum].todos);
  }
  updateToggleAllState() {
    this.pagination[this.paginationNum].todos = [...this.todos];
    this.dataSvc.saveTodos(this.pagination).subscribe(data => this.todos = data[this.paginationNum].todos);
    this.toggleAll = this.pagination[this.paginationNum].todos.filter(item => (!item.done)).length === 0;
  }
  removeTodo(todo) {
    let newPagination = [...this.pagination];
    newPagination[this.paginationNum].todos.splice(this.todos.indexOf(todo), 1);
    this.dataSvc.saveTodos(newPagination).subscribe(data => this.todos = data[this.paginationNum].todos);
  }
  ///////////////////////////////////
  showPagination() {
    this.inputP = !this.inputP;
  }
  newPagination() {
    let newP = [...this.pagination];
    newP.push({
      text: this.paginationName,
      todos: []
    });
    this.dataSvc.saveTodos(newP).subscribe(data => {
      this.pagination = data;
      this.paginationName = '';
    })
    this.inputP = false;
  }
  removeP(P) {
    if (confirm("確認移除分頁嗎")) {
      let newPagination = [...this.pagination];
      console.log(this.pagination.indexOf(P));
      newPagination.splice(this.pagination.indexOf(P), 1);
      this.dataSvc.saveTodos(newPagination).subscribe(data => {
        this.pagination = data
        this.todos = this.pagination[0].todos;
      });

    }
  }
  switchP(num) {
    this.todos = this.pagination[num].todos;
    this.paginationNum = num;
  }
}
