import {createReducer,on} from '@ngrx/store';
import {setActiveHeader} from './actions';

export interface IGlobalState {
    activeHeader:string;
}

export  const initialGlobalState: IGlobalState = {
    activeHeader:''
}



export const reducers = createReducer(
    initialGlobalState,
    on(setActiveHeader,((state:IGlobalState,action) => {
        return {
            ...state,
            activeHeader: action.activeHeader
        }
    }))

)