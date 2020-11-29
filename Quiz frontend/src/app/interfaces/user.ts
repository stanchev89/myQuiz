import { IBase } from './base';
import { IQuestion } from './question'

export interface IUser extends IBase {
  correct_answers: IQuestion[],
  answered_questions: IQuestion[],
  subscription: string;
  points: number;
  username: string;
  password: string;
}