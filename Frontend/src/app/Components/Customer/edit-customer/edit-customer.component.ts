import { EmployeeService } from '../../../Shared/services/employee.service';
import { Employee } from '../../../Shared/Models/Employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  myForm: FormGroup;
  id: string;

  listRoles ;
  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private employeeService: EmployeeService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.listRoles = [
      {
        name : 'admin'
      },
      {
        name : 'user'
      }
    ]
    this.createForm();
    this.id = this.route.snapshot.params.id;
    this.fetchData();
  }

  createForm(){
    this.myForm = this.fb.group({
      id: ['',[Validators.required]],
      username: ['',[Validators.required]],
      fullName : ['',[Validators.required]],
      role : ['', [Validators.required]],
      password : ['', [Validators.required]],
      isLoggedIn : ['', [Validators.required]]
  });
  }

  fetchData(){
    this.employeeService.getByEmployeeId(parseInt(this.id)).subscribe(
      (res) => {
        this.remplissage(res);
      },
      err => {
        console.log('error    : => '+err);
      }
    );
  }


  remplissage(emp: Employee){
    this.myForm.get('username').setValue(emp.username);
    this.myForm.get('fullName').setValue(emp.fullName);
    this.myForm.get('role').setValue(emp.role);
    this.myForm.get('id').setValue(emp.id);
    this.myForm.get('password').setValue(JSON.parse(emp.params)['pass']);
    this.myForm.get('isLoggedIn').setValue(emp.role);

  }



  submit(){
    console.log(this.myForm.value)
    this.employeeService.updateEmployee(this.myForm.value).subscribe(
      res => {
        this.router.navigateByUrl('home/customer');
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }


}
