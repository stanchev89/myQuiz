import {Routes,RouterModule} from '@angular/router';
import { LoginFormComponent } from './login-form/login-form.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes : Routes = [
    {
        path:'register',
        component:RegisterFormComponent
    },
    {
        path:'login',
        component:LoginFormComponent
    },
    {
        path:'profile',
        component:ProfileComponent
    }
]

export const UserRootingModule = RouterModule.forChild(routes);