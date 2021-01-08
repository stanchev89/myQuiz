import {Component, OnDestroy, OnInit} from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {error} from "../+store/actions";
import {AppRootState} from "../../+store";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit, OnDestroy{

  constructor(private userService: UserService, private router: Router, private store: Store, private titleService: Title) {
  }
  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
  errorMessage = this.store.select((state: AppRootState) => state.auth.errorMessage);

  ngOnInit() {
    this.setTitle('myQuiz-Login');
  }

  onSubmit(data: IUser): void {
    const {username, password} = data;
    this.userService.login(username, password).subscribe({
      next: (user) => {
        if (user === null) {
          this.store.dispatch( error({errorMessage: 'Invalid username or password!'}));
        }else{
          this.router.navigate(['/']);
        }

      },
      error: (err) => {
        this.store.dispatch( error({errorMessage: err}));
      }
    });
    }

    ngOnDestroy() {
      this.store.dispatch(error({errorMessage: ''}));
    }
}