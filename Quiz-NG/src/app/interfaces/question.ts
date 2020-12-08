import {IUser} from './user';
import {IBase} from './base';

export interface IQuestion extends IBase{
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}