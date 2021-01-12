import {createAction,props} from '@ngrx/store'
import {IUser} from "../../interfaces";
import {IUserPoints} from '../+store/reducers'

const userNamespace = '[USER]';
export const LOGIN = `${userNamespace} Login`;
export const LOGOUT = `${userNamespace} Logout`;
export const ERROR = `${userNamespace} Error`;
export const ALL_USERS = `${userNamespace} All Users`;

export const login = createAction(LOGIN, props<{ currentUser: IUser}>());
export const logout = createAction(LOGOUT);
export const error = createAction(ERROR, props<{ errorMessage: string }>());
export const allUsers = createAction(ALL_USERS,props<{allUsers: IUserPoints[]}>());



// export class Login implements Action {
//     readonly type = LOGIN;
//     payload: IUser;v
// }

// export class Logout implements Action {
//     readonly type = LOGOUT;
// }