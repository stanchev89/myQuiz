import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  userModel = class{
    constructor(public username:string,public password:string) {}
  }
  model = new this.userModel('','');

  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(data):void{
    console.log(data);
    
  }

}
