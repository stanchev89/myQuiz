import {createAction, props} from '@ngrx/store'

export const SET_ACTIVE_HEADER = '[HEADER] Set Active Page';
export const setActiveHeader = createAction(SET_ACTIVE_HEADER, props<{ activeHeader: string }>());