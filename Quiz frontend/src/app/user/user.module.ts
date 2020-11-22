import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRootingModule } from './user-routing.module'
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from './user.service';
import { FormsModule}  from '@angular/forms';
import { ProfileComponent } from './profile/profile.component'





@NgModule({
  declarations: [
    LoginFormComponent,
    RegisterFormComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    UserRootingModule
  ],providers:[
    UserService
  ]
  ,exports:[
    LoginFormComponent,
    RegisterFormComponent,
  ]
})
export class UserModule { }
