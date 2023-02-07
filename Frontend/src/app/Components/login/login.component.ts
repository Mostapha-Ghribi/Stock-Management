import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/Shared/services/log-in.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  ErrorAuth: boolean
  loginForm :FormGroup
  remember : boolean =false;

  isSubmitted : boolean = false;
  constructor(private fb:FormBuilder,
    private logInService :LogInService,
    private router : Router
    ) { }

  ngOnInit(): void {
    const currentEmployee = this.logInService.currentEmployee
    if(currentEmployee){
      this.router.navigate(["home/dashboard"])

    }
    this.buildForm();
  }

  buildForm(){
    this.loginForm = this.fb.group({
      username : ["", Validators.required],
      password : ["", Validators.required],

    })
  }

  logIn(){
    this.isSubmitted = true;
    const fd = new FormData();
    let data = {
      username : this.loginForm.controls["username"].value,
      password : this.loginForm.controls["password"].value
    }
    this.logInService.LogIn(data).subscribe(data=>{
      this.isSubmitted = false
      console.log(data.role)
      switch(data.role){
        case 'admin' : this.router.navigate(["home/dashboard"]);break;
        case 'user' : this.router.navigate(["home/products"]);break;
      }
      this.ErrorAuth =false

    }, error=>{
      this.isSubmitted = false
        this.ErrorAuth =true
    })
  }
}
