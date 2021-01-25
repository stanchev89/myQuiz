import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {setActiveHeader} from "../../+store/actions";
import {Store} from "@ngrx/store";
import {allUsers, error} from "../+store/actions";
import {AppRootState} from "../../+store";
import {tap,first,map} from "rxjs/operators";
import {IUserNoPassword} from "../../interfaces/IUserNoPassword";
import {IUserPoints} from "../+store/reducers";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  currentUser: IUserNoPassword;
  inEditMode = false;
  inChangePasswordMode = false;
  registeredBefore:string;
  myRank:number;
  errorMessage = this.store.select((state:AppRootState) => state.auth.errorMessage);

  constructor(private userService: UserService, private router: Router, private titleService: Title,private store: Store) {
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  ngOnInit(): void {
    this.store.dispatch(setActiveHeader({activeHeader:'profile'}));
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

  submitChangeUsername(data:{username:string}) {
    const oldUsername = this.currentUser.username;
    if(data.username !== oldUsername) {
      this.userService.updateProfileData(data).pipe(
          tap(req => {
            if(req.error) {
              this.store.dispatch(error({errorMessage:'Username is already used!'}));
            }
            return req;
          })
      ).subscribe((req) => {
        if(!req.error) {
          this.inEditMode = false;
          const allUsers$ = this.store.select((state:AppRootState) => state.auth.allUsers).pipe(first());
          allUsers$.subscribe((users:IUserPoints[]) => {
            if(users.length > 0) {
              const index = users.findIndex((obj:IUserPoints) => obj.username === oldUsername);
              const oldUsernameObj = users[index];
              const newUsernameObj: IUserPoints = {
                username: data.username,
                points:oldUsernameObj.points
              };
              const copyUsers = users.slice();
              copyUsers.splice(index,1,newUsernameObj);
              this.store.dispatch(allUsers({allUsers:copyUsers}));
            }
          })
          // this.userService.getAllUsers().pipe(first()).subscribe();
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