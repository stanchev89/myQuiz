import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {IUser} from "../../interfaces";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {setActiveHeader} from "../../+store/actions";
import {Store} from "@ngrx/store";
import {error} from "../+store/actions";
import {AppRootState} from "../../+store";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  currentUser: IUser;
  inEditMode = false;
  inChangePasswordMode = false;
  pageTitle = 'My profile';
  registeredBefore:string;
  myRank:number;
  errorMessage = this.store.select((state:AppRootState) => state.auth.errorMessage);

  constructor(private userService: UserService, private router: Router, private titleService: Title,private store: Store) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
    this.store.dispatch(setActiveHeader({activeHeader:'profile'}));

  }

  ngOnInit(): void {
    this.setTitle('myQuiz-Profile');
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
    this.store.dispatch(error({errorMessage:''}));
    this.inEditMode = !this.inEditMode;
    if(this.inChangePasswordMode) {
      this.inChangePasswordMode = !this.inChangePasswordMode;
    }
  }
  toggleEditPasswordMode() {
    this.store.dispatch(error({errorMessage:''}));

    this.inChangePasswordMode = !this.inEditMode;
    this.inEditMode = !this.inEditMode;
  }

  onSubmit(data:{username:string}) {
    if(data.username !== this.currentUser.username) {
      this.userService.updateProfileData(data).pipe(
          tap(data => {
            if(data.error) {
              this.store.dispatch(error({errorMessage:'Username is already used!'}));
            }
            return data;
          })
      ).subscribe((data) => {
        if(!data.error) {
          this.inEditMode = false;
        }
      } )
    }
  }

  submitChangePassword(data) {
    const {newPassword,oldPassword} = data;
    this.userService.changeUserPassword(oldPassword,newPassword).subscribe({
      next: () => {
        this.toggleEditMode();
        if(this.inChangePasswordMode) {
          this.toggleEditPasswordMode();
        }
        this.store.dispatch(error({errorMessage:''}));
        this.router.navigate(['login']);
      }, error: (err) => {
          this.store.dispatch(error({errorMessage:err.error.errorMessage}));
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

  ngOnDestroy() {
    this.store.dispatch(setActiveHeader({activeHeader:''}));
    this.store.dispatch(error({errorMessage:''}));
  }

}