import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppRootState} from "../../+store";
import {setActiveHeader} from "../../+store/actions";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit,OnDestroy {
  constructor(private store: Store<AppRootState>) { }

  ngOnInit(): void {
    this.store.dispatch(setActiveHeader({activeHeader: 'categories'}));
  }
  ngOnDestroy() {
    this.store.dispatch(setActiveHeader({activeHeader: ''}));
  }
}