import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user/user.service";
import {IUser} from "../../interfaces";

@Component({
  selector: 'app-personal-rank',
  templateUrl: './personal-rank.component.html',
  styleUrls: ['./personal-rank.component.css']
})
export class PersonalRankComponent implements OnInit {
  currentUser$ = this.userService.currentUser$;
  currentUser: IUser;
  sortedAllUsers: IUser[];
  countUsers: number;
  myRank:number;
  myPoints: number;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.currentUser$.subscribe(user => {
        this.currentUser = user;
      });
      if(this.currentUser) {
          this.userService.getAllUsers().subscribe({
              next: (users: IUser[]) => {
                  this.sortedAllUsers = users.sort((a, b) => b.correct_answers.length - a.correct_answers.length);
                  this.myRank = this.sortedAllUsers.findIndex((curUser) => curUser.username === this.currentUser.username) + 1;
                  this.countUsers = this.sortedAllUsers.length;
                  this.myPoints = this.currentUser.correct_answers.length;
              }
          })
      };
  }

}