import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {IUser} from "../../interfaces";


@Component({
selector: 'app-navigation',
templateUrl: './navigation.component.html',
styleUrls: [ './navigation.component.css' ]
})
export class NavigationComponent {
	active = 1;
	isLogged = this.userService.isLogged$;
	isVip = this.userService.isVip$;

	constructor(private userService: UserService) {}

}