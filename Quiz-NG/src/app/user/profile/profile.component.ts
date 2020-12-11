import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {IUser} from "../../interfaces";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: IUser;
  inEditMode = false;
  pageTitle = 'My profile';
  registeretBefore:string;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.registeretBefore = (this.calculateRegisteredBefore(user?.created_at));
    })
  }

  toggleEditMode() {
    this.inEditMode = !this.inEditMode;
  }

  onSubmit(data:{}) {
    this.userService.updateProfileData(data).subscribe(() => this.inEditMode = false)
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