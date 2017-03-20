import { Component, OnInit , Input , Output , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  filterType = 'All';

  @Input()
  todos : any [];

  @Output()
  clearCompleted = new EventEmitter();
  @Output()
  filterChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  clearBtnClick(){
    this.clearCompleted.emit();
  }
  changeFilterType ( filterType:string ){
    this.filterType = filterType;
    this.filterChange.emit(this.filterType);
  }
}
