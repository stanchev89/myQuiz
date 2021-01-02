import * as fromUser from '../user/+store/reducers';
import {IUserState} from "../user/+store/reducers";
import {ActionReducerMap} from "@ngrx/store";


export interface AppRootState {
    readonly auth: IUserState
}

export const reducers: ActionReducerMap<AppRootState> = {
    auth:fromUser.reducers
}