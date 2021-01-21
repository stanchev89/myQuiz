import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {IUser} from "../../interfaces";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {setActiveHeader} from "../../+store/actions";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-become-a-vip',
  templateUrl: './become-a-vip.component.html',
  styleUrls: ['./become-a-vip.component.css']
})
export class BecomeAVipComponent implements OnInit, OnDestroy {
  constructor(public userService: UserService, private router: Router, private titleService: Title,private store:Store) {}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.setTitle('myQuiz-Become a vip member');
    this.store.dispatch(setActiveHeader({activeHeader:'becomeAVip'}));
  }

  onSubmit(data): void {
    this.userService.updateProfileData({is_vip:true}).subscribe({
      next: (user:IUser)=> {

          this.router.navigate(['/'])
      },
      error: (err => {
        console.log(err);
      })
    });
  }
  ngOnDestroy() {
    this.store.dispatch(setActiveHeader({activeHeader:''}));
  }
}