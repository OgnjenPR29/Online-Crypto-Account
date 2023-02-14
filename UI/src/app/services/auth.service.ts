import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../Models/User';
import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Validate } from '../Models/Validate';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  logged: boolean;

  constructor(private http:HttpClient) { }

  isLoggedIn(){
    //provera da li je korisnik ulogovan, vrv preko tokena
    return localStorage.getItem('email') && localStorage.getItem('validated');
  }

  login(email: string, password: string): Observable<{success: boolean, token?:string, msg: string}> {

    const body = {
      Email: email,
      Password: password
    };

    localStorage.setItem('email', email);

    return this.http.post<{success: boolean, token?:string, msg: string}>(environment.serverURL +'/login', body)
    .pipe(catchError((error:HttpErrorResponse) => {
      if(error.status === 400){
        alert("Wrong email or password.")}
        else{alert(error.message)}
         return throwError(error);} ));
  }


  setLogged(){
    this.logged = true;
  }

  logout(){
    this.logged = false;
  }

  register(newUser:User): Observable<{success: boolean, msg: string, token?:string, userID?:string}>{
    return this.http.post<{success: boolean, msg: string, token?:string, userID?:string}>(environment.serverURL +'/register', newUser)
  }

  headers = new HttpHeaders({
    'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'});
  options = { headers: this.headers };

  get_rate(from:string, to:string):Observable<{lprice:string, curr1:string, curr2:string}>{
    return this.http.get<{lprice:string, curr1:string, curr2:string}>("https://cex.io/api/last_price/" + from + "/" + to)
  }

  validate(body:Validate):Observable<{status?:string, message?:string, success?:boolean}>{
    return this.http.post<{status?:string, message?:string, success?:boolean}>(environment.serverURL + "/card_validate", body)
  }

}
