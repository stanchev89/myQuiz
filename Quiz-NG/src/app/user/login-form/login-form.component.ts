import { Component } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  pageTitle = 'Login';

  constructor(private userService: UserService, private router: Router) {
  }

  onSubmit(data: IUser): void {
    const {username, password} = data;
    this.userService.login(username, password).subscribe({
      next: (user) => {
        if (user === null) {
          console.log('Invalid username or password!')
        }else{
          this.router.navigate(['/']);
        }

      },
      error: (err) => {
        console.log(err);
      }
    });
    }
  }