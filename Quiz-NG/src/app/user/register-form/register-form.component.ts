import { Component } from '@angular/core';
import { UserService } from '../user.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  submitted = false;
  pageTitle = 'Register new user';
  isError = {
      message:null
  }
  constructor(private userService: UserService, private router: Router) { }

  onSubmit(data): void{
    const {username, password} = data.value;
    this.userService.register(username, password).subscribe({
          next: (res) => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
              this.isError.message = err.error.message
          }
        }
    );
  }
}