import { IBase } from './base';
import { IQuestion } from './question'

export interface IUser extends IBase {
  correct_answers: IQuestion[],
  answered_questions: IQuestion[],
  status: string;
  points: number;
  username: string;
  password: string;
}