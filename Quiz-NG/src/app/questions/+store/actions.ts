import {createAction, props} from '@ngrx/store';
import {IQuestion} from "../../interfaces";

const questionsNamespace = '[QUESTIONS]';
export const LOAD_ALL_QUESTIONS = `${questionsNamespace} Load All Questions`;
export const SET_CATEGORIES = `${questionsNamespace} Set Categories`;

export const loadAllQuestions = createAction(LOAD_ALL_QUESTIONS,props<{allQuestions: {}}>());
export const setCategories = createAction(SET_CATEGORIES,props<{categories:string[]}>());