import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {setActiveHeader} from "../+store/actions";
import {AppRootState} from "../+store";

@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']
})
export class RulesComponent implements OnInit,OnDestroy {
  isLogged$ = this.store.select((state:AppRootState) => !!state.auth.currentUser);
  currentUser$ = this.store.select ((state:AppRootState) => state.auth.currentUser);

  constructor(private titleService: Title,private store: Store) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  ngOnInit(): void {
    this.setTitle('myQuiz-Rules');
    this.store.dispatch(setActiveHeader({activeHeader:'rules'}));
  }

  ngOnDestroy() {
    this.store.dispatch(setActiveHeader({activeHeader:''}));
  }

}