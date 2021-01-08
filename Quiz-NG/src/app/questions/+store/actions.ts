import {createAction, props} from '@ngrx/store';

const questionsNamespace = '[QUESTIONS]';
export const LOAD_ALL_QUESTIONS = `${questionsNamespace} Load All Questions`;
export const SET_CATEGORIES = `${questionsNamespace} Set Categories`;
export const REGULAR_USER_AVAILABLE_QUESTIONS = `${questionsNamespace} Set Regular User Available Questions`;
export const FINISHED_CATEGORY = `${questionsNamespace} Finished Category`;

export const loadAllQuestions = createAction(LOAD_ALL_QUESTIONS,props<{allQuestions: {}}>());
export const setCategories = createAction(SET_CATEGORIES,props<{categories:string[]}>());
export const regularUserAvailableQuestions = createAction(REGULAR_USER_AVAILABLE_QUESTIONS,props<{regularUserAvailableQuestions: boolean}>());
export const finishedCategory = createAction(FINISHED_CATEGORY,props<{finishedCategory: boolean}>());