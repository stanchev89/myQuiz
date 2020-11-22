import { Routes,RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories/categories.component';

const routes : Routes = [
    {
        path:'categories',
        component:CategoriesComponent
    }
]

export const QuestionsRoutingModule = RouterModule.forChild(routes);