import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {IUser} from "../../interfaces";
import {Router} from "@angular/router";
import {map} from 'rxjs/operators'

@Component({
  selector: 'app-become-a-vip',
  templateUrl: './become-a-vip.component.html',
  styleUrls: ['./become-a-vip.component.css']
})
export class BecomeAVipComponent implements OnInit {
  pageTitle = 'Joining to our VIP club';
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
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

}