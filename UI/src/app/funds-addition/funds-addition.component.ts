import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validate } from '../Models/Validate';
import { AuthService } from '../services/auth.service';
import { TransactionService } from '../services/transaction.service';
import { Funds } from '../Models/Funds';
@Component({
  selector: 'app-funds-addition',
  templateUrl: './funds-addition.component.html',
  styleUrls: ['./funds-addition.component.css']
})
export class FundsAdditionComponent implements OnInit {
  funds:Funds
  message:string = ''
  
  validate: Validate;
  email: string | null;
  amountStr: string | null;
  br: number;
  
  fundsForm=new FormGroup({
    email: new FormControl('', Validators.email),
    CardNumber: new FormControl('', Validators.required),
    CardCode: new FormControl('', Validators.required),
    Amount: new FormControl('', Validators.required)

  });
  constructor(private service: AuthService, private transactionService:TransactionService, private router: Router) { }

  ngOnInit(): void {
  // console.log(localStorage.getItem('validated'));
    //ne radi jer je kartica ista i uvek je true...
    if (localStorage.getItem('validated') !== 'true') {
      this.router.navigate(['/validate']);
      }
  }

  onSubmit(){
    this.amountStr = this.fundsForm.controls['Amount'].value
    if(this.amountStr!==null)
    this.br = parseFloat(this.amountStr);
    //console.log("OVO JE br: "+this.br);
    this.funds =  {
      Amount: this.br,
      Email : localStorage.getItem('email'),
      Currency :'Dollar'
    }
    this.validate = {
      CardNumber: this.fundsForm.controls['CardNumber'].value,
      CardCode: this.fundsForm.controls['CardCode'].value
    }
    
    this.service.validate(this.validate).subscribe( (response) => {
      localStorage.setItem('validated', 'true');
      this.router.navigate(['/my-profile'])

      this.transactionService.addFunds(this.funds).subscribe((resp)=>{
        this.message = 'Funds successfully paid.'
        console.log(this.funds);

      })
    }, (response) => {
      this.message = 'Wrong card number or card code, try again.';
    })
  }

}
