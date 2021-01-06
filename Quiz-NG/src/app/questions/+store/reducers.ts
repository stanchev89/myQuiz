import {createReducer, on} from '@ngrx/store';
import * as questionsActions from './actions';
import {IQuestion} from "../../interfaces";
import * as userActions from "../../user/+store/actions";
import {IUserState} from "../../user/+store/reducers";
interface IQuestionObject {
    category:IQuestion[]
}

export interface IQuestionState {
    allQuestions: IQuestionObject | {};
    categories: string[];
};

const initialState: IQuestionState = {
    allQuestions:{},
    categories:[]
};


export const reducers = createReducer<IQuestionState>(
    initialState,
    on(questionsActions.loadAllQuestions,((state: IQuestionState,action:ReturnType<typeof questionsActions.loadAllQuestions>) => {
        return {
            ...state,
            allQuestions:action.allQuestions
        }
    })),
    on(questionsActions.setCategories,((state: IQuestionState,action:ReturnType<typeof questionsActions.setCategories>) => {
        return {
            ...state,
            categories:action.categories
        }
    }))
)