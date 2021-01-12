import {Component} from '@angular/core';
import {UserService} from '../../user/user.service';
import {Store} from "@ngrx/store";
import {AppRootState} from "../../+store";
import {tap} from 'rxjs/operators'
import {ActivatedRoute} from "@angular/router";


@Component({
selector: 'app-navigation',
templateUrl: './navigation.component.html',
styleUrls: [ './navigation.component.css' ]
})
export class NavigationComponent {
	home: 'home';
	rules: 'rules';
	login: 'login';
	register: 'register';
	profile: 'profile';
	categories: 'categories';

	isLogged = this.userService.isLogged$;
	isVip = this.userService.isVip$;

	constructor(private userService: UserService,public route: ActivatedRoute) {
		route.queryParams.subscribe(res => {
			console.log(res);
		})
	}



}