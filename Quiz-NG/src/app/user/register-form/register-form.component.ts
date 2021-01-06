import {Component, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit{
  submitted = false;
  pageTitle = 'Register new user';
  isError = {
      message:null
  }
  constructor(private userService: UserService, private router: Router, private titleService: Title) { }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    ngOnInit() {
      this.setTitle('myQuiz-Register');
    }

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