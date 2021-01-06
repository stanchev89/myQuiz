import * as fromUser from '../user/+store/reducers';
import * as fromQuestions from '../questions/+store/reducers';
import {IUserState} from "../user/+store/reducers";
import {IGlobalState, reducers as globalReducers} from './reducers'
import {ActionReducerMap} from "@ngrx/store";
import {IQuestionState} from "../questions/+store/reducers";


export interface AppRootState {
    readonly auth: IUserState
    readonly globals: IGlobalState,
    readonly questions: IQuestionState
}

export const reducers: ActionReducerMap<AppRootState> = {
    auth: fromUser.reducers,
    questions: fromQuestions.reducers,
    globals : globalReducers
}