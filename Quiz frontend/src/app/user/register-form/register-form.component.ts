import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent {
  submitted = false;
  constructor(private userService:UserService) { }
  userModel = class{
    constructor(public username:string, public password:string, public repeatPassword:string){}
  }
  model = new this.userModel('','','');
    
    
  
  onSubmit(data){
    const {username,password} = data.value;
    this.userService.register(username,password).subscribe(res=>{
      console.log(res);
    }
    )
  }
  

}
