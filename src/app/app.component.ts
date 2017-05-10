import { Component, OnInit } from '@angular/core';

import { DataService } from "./data.service";
import { FirebaseService } from "./firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './loading.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What\s your pagination name? 0__0';
  todos: any[] = [];
  paginationName = '';
  filterType = '';
  pagination: any[] = [];
  inputP = false;

  constructor(private dataSvc: FirebaseService) { }

  ngOnInit() {
    this.dataSvc.getPagination().subscribe(data => {
      this.pagination = data;
      this.switchP(0);
    });
  }
  ///////////////////////////////////

  clearCompleted() {
    let newTodos = this.todos.filter(item => (!item.done));
    this.pagination[this.dataSvc.paginationNum].todos = newTodos;
    // this.dataSvc.saveTodos(this.pagination).subscribe(data => this.todos = data[this.dataSvc.paginationNum].todos);
  }
  filterChange(filterType: string) {
    this.filterType = filterType;
  }
  showPagination() {
    this.inputP = !this.inputP;
  }
  newPagination() {
    let newP = [...this.pagination];
    newP.push({
      text: this.paginationName,
      todos: []
    });
    // this.dataSvc.saveTodos(newP).subscribe(data => {
    //   this.pagination = data;
    //   this.paginationName = '';
    // })
    this.inputP = false;
  }
  removeP(P) {
    if (confirm("確認移除分頁嗎")) {//
      let newPagination = [...this.pagination];
      newPagination.splice(this.pagination.indexOf(P), 1);
      // this.dataSvc.saveTodos(newPagination).subscribe(data => {
      //   this.pagination = data
      //   this.todos = this.pagination[0].todos;
      // });

    }
  }
  switchP(num) {
    this.dataSvc.getTodos(num).subscribe(data => {
      this.todos = data;
      // this.todos = Object.keys(this.todos).map(function (key) { return key; });
    });
    this.dataSvc.paginationNum = num;
  }
}
