import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/Shared/services/product.service';
import { SupplierService } from 'src/app/Shared/services/supplier.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  form:FormGroup;
  myForm:FormGroup;
  isSbmitted:boolean=false;
  isAdedd:boolean;
  ErrorMessage :string;
  refs ;
  constructor(private fb : FormBuilder,
    private ProductService:ProductService,
    private router:Router
    ) { }

  ngOnInit(): void {
   this.createForm()
   this.buildForm();
   this.myForm.reset();
   this.getRefs()
  }

  getRefs(){
    this.ProductService.getProductsRefs().subscribe(data=>{
      this.refs = data
    })
  }
   createForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  //handle adding a new operation
  addProduct(){
    let product = this.form.value;
    if(this.refs.includes(product.ref)){
      this. ConfirmationMessage();
      this.isAdedd = false;
      this.ErrorMessage="ref already exists"
      return
    }
    //prepare product for backend
   this.ProductService.addProduct(product).subscribe(data=>{
       this.ConfirmationMessage();
       this.form.reset();
       this.isAdedd=true;
       this.ErrorMessage = "Produit ajouté avec succès"
  },error=>{
    this.ConfirmationMessage();
    this.ErrorMessage = "Il ya un problem dans l'ajouter"
        this.isAdedd=false
  })
  }
  ConfirmationMessage(){
    this.isSbmitted =true;
    setTimeout(()=>{this.isSbmitted =false;},3000)

  }

  buildForm(){
    this.form= this.fb.group({
     name : ['',[Validators.required]],
     price : ['',[Validators.pattern("^[0-9]+(\.[0-9]+)?$"),Validators.required]],
     quantity : ['',[Validators.pattern("^[0-9]+$"),Validators.required]],
     description : [''],
     ref : ['',[Validators.required]],
   })
   this.form.reset()
 }

  cancel(){
    this.router.navigate(["/home/products"])
  }

}
