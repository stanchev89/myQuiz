import { Component, Input } from '@angular/core';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(ngbConfig: NgbConfig, private userService: UserService){}
}