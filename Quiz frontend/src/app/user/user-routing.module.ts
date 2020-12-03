import {Routes,RouterModule} from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterFormComponent } from './register-form/register-form.component';

const routes : Routes = [
    {
        path:'register',
        canActivate:[AuthGuard],
        data:{
            mustBeLoggedIn:false
        },
        component:RegisterFormComponent
    },
    {
        path:'login',
        component:LoginFormComponent,
        canActivate:[AuthGuard],
        data:{
            mustBeLoggedIn:false,
            title:'Login'
        }
    },
    {
        path:'profile',
        component:ProfileComponent,
        canActivate:[AuthGuard],
        data:{
            mustBeLoggedIn:true
        }
        
    },
    {
        path:'logout',
        component:LogoutComponent,
        canActivate:[AuthGuard],
        data:{
            mustBeLoggedIn:true
        }
    }
]

export const UserRootingModule = RouterModule.forChild(routes);