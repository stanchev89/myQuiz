import { IBase } from './base';
import { IQuestion } from './question'

export interface IUser extends IBase {
  correct_answers: IQuestion[];
  status: string;
  points: number;
  username: string;
  password: string;
}