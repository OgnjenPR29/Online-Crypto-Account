import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Funds } from '../Models/Funds';
import { Exchange } from '../Models/Exchange';
import { Transaction } from '../Models/Transaction';
import { THistory } from '../Models/THistory';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }
  addFunds(funds:Funds):Observable<{message?:string, success?:boolean}>{
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<{message?:string, success?:boolean}>(environment.serverURL + "/payment",funds, httpOptions)
  }
  buyCurrency(bodyExchange: Exchange):Observable<{success?:boolean, msg?:string}>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<{success?:boolean, msg?:string}>(environment.serverURL + "/convert", bodyExchange, httpOptions);
  }

  sendFunds(transaction:Transaction):Observable<{status:string}>{

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };

    return this.http.post<{status:string}>(environment.serverURL + "/transactions", transaction, httpOptions)
    .pipe(catchError((error:HttpErrorResponse) => { 
      if(error.status === 400){
        alert(error.message)
      }
      else {
        alert(error.message)
      }
      return throwError(error);    }));

  }

  getTransactionHistory(email:string | null):Observable<THistory[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<THistory[]>(`${environment.serverURL}/transactions/${email}`, httpOptions);
  }
  
}