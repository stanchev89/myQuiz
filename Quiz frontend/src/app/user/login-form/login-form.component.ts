import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces';
import { UserService } from '../user.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(private userService:UserService) { }
  pageTitle:string = 'Login form';
 

  onSubmit(data:IUser):void{
    const {username,password} = data;
    this.userService.login(username,password).subscribe(res => console.log(res)
    )
    
  }

}
