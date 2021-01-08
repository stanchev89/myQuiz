import {createReducer, on} from '@ngrx/store';
import * as questionsActions from './actions';
import {IQuestion} from "../../interfaces";

interface IQuestionObject {
    category:IQuestion[]
}

export interface IQuestionState {
    allQuestions: IQuestionObject | {};
    categories: string[];
    regularUserAvailableQuestions: boolean,
    finishedCategory: boolean
};

const initialState: IQuestionState = {
    allQuestions:{},
    categories:[],
    regularUserAvailableQuestions: true,
    finishedCategory: false
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
    })),
    on(questionsActions.regularUserAvailableQuestions,((state:IQuestionState,action:ReturnType<typeof questionsActions.regularUserAvailableQuestions>) => {
        return {
            ...state,
            regularUserAvailableQuestions: action.regularUserAvailableQuestions
        }
    })),
    on(questionsActions.finishedCategory,((state:IQuestionState,action:ReturnType<typeof questionsActions.finishedCategory>) => {
        return {
            ...state,
            finishedCategory: action.finishedCategory
        }
    }))
)