import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {IUser} from "../../interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: IUser;
  inEditMode = false;
  inChangePasswordMode = false;
  pageTitle = 'My profile';
  registeredBefore:string;
  myRank:number;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.registeredBefore = (this.calculateRegisteredBefore(user?.created_at));
    });
    this.userService.getAllUsers().subscribe(users => {
        users = users.sort((a,b) => b.correct_answers.length - a.correct_answers.length);
        this.myRank = users.findIndex((curUser) => curUser.username === this.currentUser.username) + 1;
    })
  }

  toggleEditMode() {
    this.inEditMode = !this.inEditMode;
    if(this.inChangePasswordMode) {
      this.inChangePasswordMode = !this.inChangePasswordMode;
    }
  }
  toggleEditPasswordMode() {
    this.inChangePasswordMode = !this.inEditMode;
    this.inEditMode = !this.inEditMode;
  }

  onSubmit(data:{}) {
    this.userService.updateProfileData(data).subscribe(() => this.inEditMode = false)
  }

  submitChangePassword(data) {
    const {newPassword,oldPassword} = data;
    this.userService.changeUserPassword(oldPassword,newPassword).subscribe({
      next: () => {
        this.toggleEditMode();
        if(this.inChangePasswordMode) {
          this.toggleEditPasswordMode();
        }
        this.router.navigate(['login']);
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  calculateRegisteredBefore(dateString) {
    const registeredAt = Date.parse(dateString);
    let delta = Math.abs(Date.now() - registeredAt) / 1000;
    const container = new Map;

// calculate (and subtract) whole days
    let days = Math.floor(delta / 86400);
    delta -= days * 86400;
    container.set('days',days);

// calculate (and subtract) whole hours
    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;
    container.set('hours',hours);


// calculate (and subtract) whole minutes
    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;
    container.set('minutes',minutes);
    const output = [];

// what's left is seconds
    let seconds = Math.floor(delta % 60);
    container.set('seconds',seconds);
    container.forEach((value,key) => {
      if(value !== 0 && !isNaN(value) && value !== undefined) {
        output.push(`${value} ${key}`);
      }
    })
    return output.join(' : ') + ' ago';
  }

}