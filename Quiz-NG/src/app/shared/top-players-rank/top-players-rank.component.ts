import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user/user.service";
import {IUserPoints} from "../../user/+store/reducers";
import {Store} from "@ngrx/store";
import {AppRootState} from "../../+store";
import {Observable} from "rxjs";

@Component({
  selector: 'app-top-players-rank',
  templateUrl: './top-players-rank.component.html',
  styleUrls: ['./top-players-rank.component.css']
})
export class TopPlayersRankComponent implements OnInit {
  topFiveUsers:Observable<IUserPoints[]> = this.store.select((state:AppRootState) => state.auth.allUsers.slice(0,5));

  constructor(private userService: UserService, private store: Store) { }

  ngOnInit(): void {

  }

}