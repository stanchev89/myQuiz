import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import {AuthGuard} from '../core/auth.guard';
import {QuestionsResolver} from "../core/resolvers/questions-resolver";
import {AddNewQuestionComponent} from "./add-new-question/add-new-question.component";

const routes: Routes = [
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categories/:category',
        component: QuestionsListComponent,
        canActivate: [AuthGuard],
        resolve: {
            questions:QuestionsResolver
        },
        data: {
            mustBeLoggedIn: true
        }
    },
    {
        path: 'add_new_question',
        component: AddNewQuestionComponent,
        canActivate: [AuthGuard],
        data: {
            mustBeLoggedIn: true,
            mustBeVip: true
        }
    }
];

export const QuestionsRoutingModule = RouterModule.forChild(routes);