import { IBase } from './base';

export interface IUserNoPassword extends IBase {
    correct_answers: string[];
    answered_questions: string[];
    is_vip: boolean;
    username: string;
}