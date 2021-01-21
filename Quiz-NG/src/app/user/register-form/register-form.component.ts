import {Component, OnDestroy, OnInit} from '@angular/core';
import { UserService } from '../user.service';
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {Store} from "@ngrx/store";
import {AppRootState} from "../../+store";
import {error} from '../+store/actions'
import {setActiveHeader} from "../../+store/actions";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit, OnDestroy{
  submitted = false;
  pageTitle = 'Register new user';
  error = this.store.select((state:AppRootState) => state.auth.errorMessage);
  constructor(private userService: UserService, private router: Router, private titleService: Title, private store: Store) { }

    public setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }

    ngOnInit() {
        this.store.dispatch(setActiveHeader({activeHeader:'register'}));
        this.setTitle('myQuiz-Register');
    }

    onSubmit(data): void{
    const {username, password} = data.value;
    this.userService.register(username, password).subscribe({
          next: (res) => {
            this.router.navigate(['/login']);
          },
          error: (err) => {
              this.store.dispatch(error({errorMessage: err.error.message}));
          }
        }
    );
  }

  ngOnDestroy() {
      this.store.dispatch(error({errorMessage: ''}));
      this.store.dispatch(setActiveHeader({activeHeader:''}));

  }
}