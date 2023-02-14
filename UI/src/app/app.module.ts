import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './log-in/log-in.component';
import { HomeComponent } from './home/home.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ValidateComponent } from './validate/validate.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FundsAdditionComponent } from './funds-addition/funds-addition.component';
import { BuyCurrencyComponent } from './buy-currency/buy-currency.component';
import { ExchangeCurrencyComponent } from './exchange-currency/exchange-currency.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    LogInComponent,
    HomeComponent,
    LogInComponent,
    MyProfileComponent,
    ValidateComponent,
    EditUserComponent,
    FundsAdditionComponent,
    BuyCurrencyComponent,
    ExchangeCurrencyComponent,
    TransferComponent,
    TransactionHistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
