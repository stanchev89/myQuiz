import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import {AuthGuard} from '../core/auth.guard';
import {QuestionsResolver} from "../core/resolvers/questions-resolver";

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
    }
];

export const QuestionsRoutingModule = RouterModule.forChild(routes);