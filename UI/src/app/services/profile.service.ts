import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable,throwError,catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../User';
import { User as UserPass } from '../Models/User';
import { BlobOptions } from 'buffer';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient, private router: Router) { }

  getProfile():Observable<User>{

    const email = <string>localStorage.getItem('email');
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    

    return this.http.get<User>(`${environment.serverURL}/${email}`, httpOptions)
    .pipe(catchError((error:HttpErrorResponse) => {
      if(error.status === 401){
        alert("You are not logged in.");
      }
      else{
        alert(error.message)
      }
        
      return throwError(error);} ));
    
  }

  updateProfile(profile: UserPass): Observable<{success:boolean}> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    
    return this.http.post<{success:boolean}>(`${environment.serverURL}`+'/edit', profile,httpOptions);
  }



}
