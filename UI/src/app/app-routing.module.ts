import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './home/home.component';
import { ValidateComponent } from './validate/validate.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FundsAdditionComponent } from './funds-addition/funds-addition.component';
import { BuyCurrencyComponent } from './buy-currency/buy-currency.component';
import { ExchangeCurrencyComponent } from './exchange-currency/exchange-currency.component';
import { TransferComponent } from './transfer/transfer.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: NewUserComponent},
  {path: 'my-profile', component: MyProfileComponent},
  {path: 'login', component: LogInComponent},
  {path: 'validate', component: ValidateComponent},
  {path: 'edit-user', component:EditUserComponent},
  {path: 'add-funds', component:FundsAdditionComponent},
  {path: 'buy-currency', component:BuyCurrencyComponent},
  {path: 'exchange-currency', component:ExchangeCurrencyComponent},
  {path: 'transfer', component:TransferComponent},
  {path: 'history', component: TransactionHistoryComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
