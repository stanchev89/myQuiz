import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {setActiveHeader} from "../+store/actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  constructor(private titleService: Title,private store:Store) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle('myQuiz');
    this.store.dispatch(setActiveHeader({activeHeader:'/'}));
  }

  ngOnDestroy() {
    this.store.dispatch(setActiveHeader({activeHeader:''}));
  }
}