import {Component, OnInit} from '@angular/core';
import {UserService} from '../../user/user.service';
import {BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";



@Component({
selector: 'app-navigation',
templateUrl: './navigation.component.html',
styleUrls: [ './navigation.component.css' ]
})
export class NavigationComponent {
	active$:  BehaviorSubject<number | string | undefined> = new BehaviorSubject(1);
	active = this.active$.pipe(map(n => n));

	isLogged = this.userService.isLogged$;
	isVip = this.userService.isVip$;

	constructor(private userService: UserService) {}

}