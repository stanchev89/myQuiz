import { Component, Input } from '@angular/core';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user/user.service';
import {Title} from "@angular/platform-browser";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isReady$ = this.userService.isReady$;
  constructor(ngbConfig: NgbConfig, private userService: UserService,private titleService:Title){}

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }
}