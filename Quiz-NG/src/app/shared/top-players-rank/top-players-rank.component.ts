import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user/user.service";
import {IUser} from "../../interfaces";

@Component({
  selector: 'app-top-players-rank',
  templateUrl: './top-players-rank.component.html',
  styleUrls: ['./top-players-rank.component.css']
})
export class TopPlayersRankComponent implements OnInit {
  topFiveUsers:IUser[];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
        users => {
          this.topFiveUsers = users.sort((a,b) => b.correct_answers.length - a.correct_answers.length).slice(0,5);
        }
    )
  }

}