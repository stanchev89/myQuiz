import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user/user.service";
import {IUser} from "../../interfaces";
import {Input} from '@angular/core'
import {Store} from "@ngrx/store";
import {map} from 'rxjs/operators'
import {AppRootState} from "../../+store";
import {IUserPoints} from "../../user/+store/reducers";
import {Observable} from "rxjs";

@Component({
  selector: 'app-personal-rank',
  templateUrl: './personal-rank.component.html',
  styleUrls: ['./personal-rank.component.css']
})
export class PersonalRankComponent implements OnInit {
  @Input() currentUser:IUser;
  allUsers: Observable<IUserPoints[]> = this.store.select((state:AppRootState) => state.auth.allUsers);
  myRank:Observable<number>;
  myPoints: Observable<number>;
  constructor(private userService: UserService, private store: Store) { }

  ngOnInit(): void {
      if(this.currentUser){
          this.myRank = this.allUsers.pipe(map((users:IUserPoints[]) => users.findIndex((curUser:IUserPoints) => curUser.username === this.currentUser.username) + 1));
          this.myPoints = this.allUsers.pipe(
              map((users:IUserPoints[]) => users.find((user:IUserPoints) => user.username === this.currentUser.username)?.points)
          );
      }
  }

}