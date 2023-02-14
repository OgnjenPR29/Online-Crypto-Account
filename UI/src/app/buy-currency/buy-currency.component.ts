import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TransactionService } from '../services/transaction.service';
import { AuthService } from '../services/auth.service';
import { Funds } from '../Models/Funds';
import { response } from 'express';
import { Exchange } from '../Models/Exchange';

@Component({
  selector: 'app-buy-currency',
  templateUrl: './buy-currency.component.html',
  styleUrls: ['./buy-currency.component.css']
})
export class BuyCurrencyComponent implements OnInit {

  buyForm = new FormGroup({
    currency: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    priceUsd: new FormControl(''),
    email: new FormControl('', Validators.email)
  });
  
  //bodyExchange: Exchange;
  bodyFundsUSD: Funds;
  currencyList: any[] = [];
  message?: string = '';


  usd: number;
  amount:number;
  temp:string | null;
  rate: string;
  constructor(private transactionService: TransactionService, private authService: AuthService) { 
    
  }

  ngOnInit(): void {
      
    this.currencyList = [
      { name: 'BTC' },
      { name: 'ETH' },
      { name: 'BNB' },
      { name: 'DOGE' },
      { name: 'XRP' },
    ];
  }

  onAmountChange(){
    const curr = this.buyForm.controls['currency'].value;
    const btcAmount = this.buyForm.controls['amount'].value;
    
    if(curr!=='' && curr!==null)
    {
      
      if(btcAmount!==null && btcAmount!==''){
        this.authService.get_rate(curr,'USD').subscribe((response)=>{
          this.usd = parseFloat(response.lprice);//kolicina dolara u zavisnosti od crypto
          this.amount = parseFloat(btcAmount);
          this.buyForm.controls['priceUsd'].setValue((this.amount*this.usd).toString())
        });
      }
      else{
        this.buyForm.controls['priceUsd'].setValue('SET AMOUNT')
        
      }
    }else{
      this.buyForm.controls['priceUsd'].setValue('SET CURRENCY')

    }
  }

  onSubmit() {
    
    this.temp = this.buyForm.controls['amount'].value;

    console.log(this.usd+"AAA")
    if(this.temp!==null)
    {
      const bodyExchange:Exchange={
        Amount: parseFloat(this.temp),
        Email: localStorage.getItem('email'),
        Currency1: 'Dollar',
        Currency2: this.buyForm.controls['currency'].value,
        ExcRate: this.usd
    }
    console.log(bodyExchange);
    
    this.transactionService.buyCurrency(bodyExchange).subscribe((resp)=>{
      this.message = resp.msg
    })
    
  }
}

}
