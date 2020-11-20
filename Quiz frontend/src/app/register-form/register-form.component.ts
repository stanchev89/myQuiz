import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  submitted = false;
  constructor() { }
  userModel = class{
    constructor(public username:string, public password:string, public repeatPassword:string){}
  }
  model = new this.userModel('','','');
  ngOnInit(): void {
    
    
  }
  onSubmit(data){
    console.log(data);
    
  }
  

}
