import { IBase } from './base';
import { IQuestion } from './question';

export interface IUser extends IBase {
  correct_answers: string[];
  answered_questions: string[];
  subscription: string;
  username: string;
  password: string;
}