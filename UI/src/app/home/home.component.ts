import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  rates = {
    BTC: "0",
    ETH: "0",
    BNB: "0",
    DOGE: "0",
    XRP: "0"
  }

  constructor(private service:AuthService) { }

  ngOnInit(): void {
    this.service.get_rate('BTC', 'USD').subscribe((response) => {
      this.rates.BTC=response.lprice
      console.log(this.rates.BTC);
    }, (response) => {
      this.rates.BTC="no data";
    });

    this.service.get_rate('XRP', 'USD').subscribe((response) => {
      this.rates.XRP=response.lprice
    }, (response) => {
      this.rates.XRP="no data";
    });

    this.service.get_rate('ETH', 'USD').subscribe((response) => {
      this.rates.ETH=response.lprice
    }, (response) => {
      this.rates.ETH="no data";
    });

    this.service.get_rate('BNB', 'USD').subscribe((response) => {
      this.rates.BNB=response.lprice
    }, (response) => {
      this.rates.BNB="no data";
    });

    this.service.get_rate('DOGE', 'USD').subscribe((response) => {
      this.rates.DOGE=response.lprice
    }, (response) => {
      this.rates.DOGE="no data";
    });
  }
}
