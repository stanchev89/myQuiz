import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriesComponent } from './questions/categories/categories.component';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'rules',
    component: RulesComponent
  }

];
export const AppRoutingModule = RouterModule.forRoot(routes);