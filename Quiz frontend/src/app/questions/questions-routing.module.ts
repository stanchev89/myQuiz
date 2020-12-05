import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';
import {AuthGuard} from '../core/auth.guard';

const routes: Routes = [
    {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'categories/:categorie',
        component: QuestionsListComponent,
        canActivate: [AuthGuard]
    }
];

export const QuestionsRoutingModule = RouterModule.forChild(routes);