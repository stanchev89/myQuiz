import { Component } from '@angular/core';
import {IUser} from "../../interfaces";
import {Input} from '@angular/core'
import {Observable} from "rxjs";

@Component({
  selector: 'app-personal-rank',
  templateUrl: './personal-rank.component.html',
  styleUrls: ['./personal-rank.component.css']
})
export class PersonalRankComponent  {
  @Input() currentUser:IUser;
  @Input() myRank:Observable<number>;
  @Input() myPoints:Observable<number>;

  constructor() { }

}