import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { Exchange } from '../Models/Exchange';
import { AuthService } from '../services/auth.service';
import { TransactionService } from '../services/transaction.service';
@Component({
  selector: 'app-exchange-currency',
  templateUrl: './exchange-currency.component.html',
  styleUrls: ['./exchange-currency.component.css']
})
export class ExchangeCurrencyComponent implements OnInit {
  currencyList: any=[];

  buyForm = new FormGroup({
    currency1: new FormControl('', Validators.required),
    currency2: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    amount2: new FormControl(''),
    email: new FormControl('', Validators.email)
  });
  
  excRate:string;
  excRate2:string;
  newAmount2:string;

  temp:string | null;
  message?:string;
  rateFinal:string;
  constructor(private authService: AuthService, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.currencyList = [
      { name: 'BTC' },
      { name: 'ETH' },
      { name: 'BNB' },
      { name: 'DOGE' },
      { name: 'XRP' },
    ];
  }

  async onAmountChange(){
    const curr1 = this.buyForm.controls['currency1'].value;
    const amount1 = this.buyForm.controls['amount'].value;
    const curr2 = this.buyForm.controls['currency2'].value;
    const amount2 = this.buyForm.controls['amount2'].value;
   
    if (curr1 && curr2 && amount1) {
      //this.amountStr = amount1.toString();
      const response = await this.authService.get_rate(curr1,'USD').toPromise();
      if(response!==undefined)
      this.excRate = response.lprice;
      
      const response2 = await this.authService.get_rate(curr2,'USD').toPromise();
      console.log("EE"+response2)
      if(response2!==undefined)
      this.excRate2 = response2.lprice;     //rate izmedju dolara i zeljene kripto
      this.newAmount2 = ((parseFloat(amount1)*parseFloat(this.excRate))/parseFloat(this.excRate2)).toString()
      
      //rate izmedju dve kripto
      this.rateFinal = (parseFloat(this.excRate2)/parseFloat(this.excRate)).toString()
      
      this.buyForm.controls['amount2'].setValue(this.newAmount2);
    }
    else {
      // U suprotnom, postavljamo poruku da su polja obavezna
      this.buyForm.controls['amount2'].setValue('SET ALL FIELDS');
    }
  }
  onSubmit(){
    console.log(this.newAmount2)
    
    this.temp = this.buyForm.controls['amount2'].value;
    let rate = parseFloat(this.rateFinal)//float rate-a izmedju 2 kripto
    //console.log(this.usd+"AAA")
    if(this.temp!==null)
    {
      const bodyExchange:Exchange={
        Amount: parseFloat(this.temp),
        Email: localStorage.getItem('email'),
        Currency1: this.buyForm.controls['currency1'].value,
        Currency2: this.buyForm.controls['currency2'].value,
        ExcRate: rate
    }
    console.log(bodyExchange);
    
    this.transactionService.buyCurrency(bodyExchange).subscribe((resp)=>{
      this.message = resp.msg
    })
    
  }

  }

}
