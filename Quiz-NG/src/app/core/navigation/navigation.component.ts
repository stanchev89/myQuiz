import {Component} from '@angular/core';
import {UserService} from '../../user/user.service';
import {Store} from "@ngrx/store";
import {AppRootState} from "../../+store";


@Component({
selector: 'app-navigation',
templateUrl: './navigation.component.html',
styleUrls: [ './navigation.component.css' ]
})
export class NavigationComponent{

	active$ = this.store.select((state:AppRootState) => state.globals.activeHeader);
	isLogged = this.userService.isLogged$;
	isVip = this.userService.isVip$;

	constructor(private userService: UserService,private store: Store) {
	}


}