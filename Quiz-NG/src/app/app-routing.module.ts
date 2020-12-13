import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RulesComponent } from './rules/rules.component';
import {AuthGuard} from "./core/auth.guard";
import {AboutComponent} from "./core/about/about.component";
import {ContactsComponent} from "./core/contacts/contacts.component";
import {NoResponseComponent} from './core/no-response/no-response.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rules',
    component: RulesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'about',
    component: AboutComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contacts',
    component: ContactsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NoResponseComponent,
    canActivate: [AuthGuard]
  }

];
export const AppRoutingModule = RouterModule.forRoot(routes);