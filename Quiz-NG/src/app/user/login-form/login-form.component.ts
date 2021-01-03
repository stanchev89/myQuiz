import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../user.service';
import {Router} from '@angular/router';
import {Store} from "@ngrx/store";
import {error} from "../+store/actions";
import {AppRootState} from "../../+store";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  pageTitle = 'Login';
  // isError = {
  //   message:null
  // }
  constructor(private userService: UserService, private router: Router, private store: Store) {
  }
  errorMessage = this.store.select((state: AppRootState) => state.auth.errorMessage);

  onSubmit(data: IUser): void {
    const {username, password} = data;
    this.userService.login(username, password).subscribe({
      next: (user) => {
        if (user === null) {
          this.store.dispatch(error({errorMessage: 'Invalid username or password!'}));
        }else{
          this.router.navigate(['/']);
        }

      },
      error: (err) => {


      }
    });
    }
  }