import { createReducer, on} from "@ngrx/store";
import * as userActions from './actions';
import {IUserNoPassword} from "../../interfaces/IUserNoPassword";

export interface IUserPoints {
    username: string,
    points: number
}

export interface IUserState {
    currentUser: IUserNoPassword | null | undefined;
    errorMessage: string | undefined;
    allUsers: IUserPoints[]
}

const initialState: IUserState = {
    currentUser: null,
    errorMessage: '',
    allUsers: []
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
    on(userActions.error,((state: IUserState,action) => {
        return {
            ...state,
            errorMessage: action.errorMessage
        }
    })),
    on(userActions.allUsers,((state:IUserState,action:ReturnType<typeof userActions.allUsers>) => {
        return {
            ...state,
            allUsers: action.allUsers
        }
    }))
)