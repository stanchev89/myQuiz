import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from '../core/auth.guard';
import { LoginFormComponent } from './login-form/login-form.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import {BecomeAVipComponent} from './become-a-vip/become-a-vip.component';
import {AddNewQuestionComponent} from './add-new-question/add-new-question.component';

const routes: Routes = [
    {
        path: 'register',
        canActivate: [AuthGuard],
        data: {
            mustBeLoggedIn: false
        },
        component: RegisterFormComponent
    },
    {
        path: 'login',
        component: LoginFormComponent,
        canActivate: [AuthGuard],
        data: {
            mustBeLoggedIn: false,
        }
    },
    {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
        data: {
            mustBeLoggedIn: true
        }

    },
    {
        path: 'logout',
        component: LogoutComponent,
        canActivate: [AuthGuard],
        data: {
            mustBeLoggedIn: true
        }
    },
    {
        path: 'vip',
        component: BecomeAVipComponent,
        canActivate: [AuthGuard],
        data: {
            mustBeLoggedIn: true,
            mustBeVip: false
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

export const UserRootingModule = RouterModule.forChild(routes);