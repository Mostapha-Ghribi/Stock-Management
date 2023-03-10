import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Shared/Models/Employee.model';
import { LogInService } from 'src/app/Shared/services/log-in.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  tabActive=1;
  currentEmployee : Employee;

  constructor(private logInService : LogInService, private router : Router) { }

  ngOnInit(): void {
  this.currentEmployee=  this.logInService.currentEmployee
  }
  switch(id){
    this.tabActive=id;
  }

  logout(){
    console.log(this.currentEmployee)
    console.log(this.currentEmployee?.id)
    this.logInService.LogOut(this.currentEmployee?.id).subscribe(data=>{
      this.router.navigate(["/login"])
    }, error=>{
      console.log(error)
    })
  }

}
