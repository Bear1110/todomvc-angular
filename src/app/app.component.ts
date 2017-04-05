import { Component, OnInit } from '@angular/core';

import { DataService } from "./data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', './loading.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What\s your pagination name? 0__0';
  todos: any[] = [];
  paginationName = '';
  paginationNum = 0;
  pagination: any[] = [];
  inputP = false;

  constructor(private dataSvc: DataService) { }

  ngOnInit() {
    this.dataSvc.getTodos().subscribe(data => {
      this.pagination = data;
      this.switchP(0);
    });
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
    if (confirm("確認移除分頁嗎")) {//
      let newPagination = [...this.pagination];
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
