import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})

export class LogInComponent implements OnInit {

  email:string;
  password:string;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
  }

  onSubmit(){

    if(!this.email){
      alert('You must enter your email!');
      return; }

    if(!this.password){
      alert('You forgot to enter the password.');
      return; }
    
    this.authService.login(this.email, this.password).subscribe((response) => {
      if(response.success === true){
        this.authService.setLogged();
        this.router.navigate(['/my-profile']);
        if(response.token){
          localStorage.setItem('token', response.token);
          localStorage.setItem('validated', 'true');
          localStorage.setItem('email', this.email);
        }
      }
      else{alert(response.msg)}
     });
  }

}
