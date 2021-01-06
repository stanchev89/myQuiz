import {Component} from '@angular/core';
import {UserService} from '../../user/user.service';
import {map} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {AppRootState} from "../../+store";
import {BehaviorSubject} from 'rxjs'


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

	active$:  BehaviorSubject<number | string | undefined> = new BehaviorSubject('1');
	active = this.active$.pipe(map(n => n));
	// active$ = this.store.select(state => state.globals.activeHeader);
	// active = this.active$.pipe(
	// 	map(activeHeader => {
	// 		if(activeHeader === 'categories') {
	// 			return 3;
	// 		}
	// 		return 1;
	// 	})
	// )

	isLogged = this.userService.isLogged$;
	isVip = this.userService.isVip$;

	constructor(private userService: UserService, private store: Store<AppRootState>) {}

}