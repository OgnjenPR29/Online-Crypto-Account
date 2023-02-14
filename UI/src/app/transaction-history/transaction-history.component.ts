import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../services/transaction.service';
import { THistory } from '../Models/THistory';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  history:THistory[] | null

  constructor(private service:TransactionService, private router:Router) { }

  ngOnInit(): void {
    this.service.getTransactionHistory(localStorage.getItem('email')).subscribe((response) => {
      this.history = response;
      this.history.forEach(item => {if(item.Time_stamp){ item.Time_stamp = item.Time_stamp?.replace('T', ' ')}})
      console.log(this.history);
    })
  }

}
