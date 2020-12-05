import { IBase } from './base';
import { IQuestion } from './question';

export interface IUser extends IBase {
  correct_answers: IQuestion[];
  answered_questions: IQuestion[];
  subscription: string;
  username: string;
  password: string;
}