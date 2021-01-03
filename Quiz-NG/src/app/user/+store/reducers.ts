import { createReducer, on} from "@ngrx/store";
import * as userActions from './actions';
import {IUser} from "../../interfaces";

export interface IUserState {
    currentUser: IUser | null | undefined;
    errorMessage: string | null | undefined;
}

const initialState: IUserState = {
    currentUser: null,
    errorMessage: null
};


 function login(state = initialState, action: ReturnType<typeof userActions.login>) {
    return {
        ...state,
        currentUser: action.currentUser
    }
};

 function logout(state: IUserState) {
    return {
        ...state,
        currentUser: null
    }
}

export const reducers = createReducer<IUserState>(
    initialState,
    on(userActions.login, login),
    on(userActions.logout, logout),
    on(userActions.error,(state => {
        return {
            ...state,
            errorMessage: state.errorMessage
        }
    }))
)