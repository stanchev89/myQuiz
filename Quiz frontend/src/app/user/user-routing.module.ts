import {Routes,RouterModule} from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes : Routes = [
    {
        path:'register',
        component:RegisterFormComponent
    },
    {
        path:'login',
        component:LoginFormComponent
    }
]

export const UserRootingModule = RouterModule.forChild(routes);