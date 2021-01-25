import { IBase } from './base';

export interface IUser extends IBase {
  correct_answers: string[];
  answered_questions: string[];
  is_vip: boolean;
  username: string;
  password: string;
}