import { Routes,RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';
import { QuestionsListComponent } from './questions-list/questions-list.component';

const routes : Routes = [
    {
        path:'categories',
        component:CategoriesComponent
    },
    {
        path:'categories/:categorie',
        component:QuestionsListComponent
    }

]

export const QuestionsRoutingModule = RouterModule.forChild(routes);