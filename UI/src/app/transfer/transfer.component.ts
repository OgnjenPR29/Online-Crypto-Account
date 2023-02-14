import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../services/transaction.service';
import { Transaction } from '../Models/Transaction';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {

  currencyList:any=[]

  transferForm = new FormGroup({
    reciever: new FormControl(''),
    amount: new FormControl(''),
    currency: new FormControl('')
  });

  constructor(private transactionServis:TransactionService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {

    if(!this.authService.isLoggedIn()){
      alert("You are not looged in!");
      this.router.navigate(['/login']);
      return;
    }    

    this.currencyList = [
      { name: 'BTC' },
      { name: 'ETH' },
      { name: 'BNB' },
      { name: 'DOGE' },
      { name: 'XRP' },
    ];
  }

  onSubmit(){

    const sender = localStorage.getItem('email');
    
    const reciever = this.transferForm.controls['reciever'].value;
    const amount = this.transferForm.controls['amount'].value;
    const currency = this.transferForm.controls['currency'].value;

    let temp: number | null  = 0;

    if(amount !== null){
      temp = parseFloat(amount);
    }

    const transaction:Transaction = {
      Sender: sender,
      Reciever: reciever,
      Amount: temp,
      Currency: currency
    }

    this.router.navigate(['my-profile'])

    return this.transactionServis.sendFunds(transaction).subscribe((response) => {
    
      if(response.status === 'approved'){
      alert("Transaction is successfully done");
      }
      else if(response.status === 'rejected' ){
        alert("Transaction is not successfully done");
      }
      
  })
  
  }

}
