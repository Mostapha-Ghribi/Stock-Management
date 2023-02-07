import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/Shared/Models/Category.model';
import { Supplier } from 'src/app/Shared/Models/Supplier.model';
import { ProductService } from 'src/app/Shared/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  form:FormGroup;

  oldRef :string;
  listCategory : Category[]=[]
  id :number;
  isAdedd: boolean=false;
  ErrorMessage:string

  refs ;
  listSupplier : Supplier[]=[]
  isSbmitted:boolean=false;
  constructor(private fb:FormBuilder,private activeRoute:ActivatedRoute,
    private router:Router ,
    private ProductService:ProductService
    ) { }

  ngOnInit(): void {
    this.id = +this.activeRoute.snapshot.paramMap.get("id")
    this.getProduct(this.id);
    this.getRefs()
    this.buildForm();

  }


  getProduct(id:number){
    this.ProductService.getByProductId(id).subscribe(data=>{
      this.oldRef = data.ref;
     this.form.patchValue(data);
    })
  }

   getRefs(){
    this.ProductService.getProductsRefs().subscribe(data=>{
      this.refs = data
    })
   }

  updateProduct(){
    let product = this.form.value;
     this.refs = this.refs.filter(object => {
      return object !== this.oldRef;
    });
    console.log(this.refs)
      if(this.refs.includes(product.ref)){
        this. ConfirmationMessage();
        this.ErrorMessage="ref already exists"
        return
      }
    this.ProductService.updateProduct(product).subscribe(data=>{
      this. ConfirmationMessage();
      this.isAdedd =true;
      this.ErrorMessage="Produit modifier avec ssucces"
    },error=>{
      console.log(error)
      this. ConfirmationMessage();
      this.isAdedd =false;
      this.ErrorMessage="Un problem dans modification"
    })
  }
      cancel(){
          this.router.navigate(["/home/products"])
      }
      ConfirmationMessage(){
        this.isSbmitted =true;
        setTimeout(()=>{this.isSbmitted =false;},3000)
      }
      buildForm(){
        this.form= this.fb.group({
         id : ['',[Validators.required]],
         name : ['',[Validators.required]],
         price : ['',[Validators.pattern("^[0-9]+(\.[0-9]+)?$"),Validators.required]],
         quantity : ['',[Validators.pattern("^[0-9]+$"),Validators.required]],
         description : [''],
         ref : ['',[Validators.required]],
       })
     }

  }

