import {IUser} from './user';
import {IBase} from './base';

export interface IQuestion extends IBase{
    category:string,
    type:string,
    difficulty:string,
    title:string,
    correct_answer:string,
    incorrect_answers:string[],
    users_passed:IUser[]

}
