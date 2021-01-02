import {createAction,props} from '@ngrx/store'
import {IUser} from "../../interfaces";

const userNamespace = '[USER]';
export const LOGIN = `${userNamespace} Login`;
export const LOGOUT = `${userNamespace} Logout`;

export const login = createAction(LOGIN, props<{ currentUser: IUser }>());
export const logout = createAction(LOGOUT);


// export class Login implements Action {
//     readonly type = LOGIN;
//     payload: IUser;v
// }

// export class Logout implements Action {
//     readonly type = LOGOUT;
// }