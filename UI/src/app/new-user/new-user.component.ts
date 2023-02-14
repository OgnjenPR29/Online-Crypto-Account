import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../Models/User';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  newUserForm=new FormGroup({
    email: new FormControl('', Validators.email),
    first_name: new FormControl('', Validators.maxLength(100)),
    last_name: new FormControl('', Validators.maxLength(100)),
    address: new FormControl('', Validators.maxLength(100)),
    city: new FormControl('', Validators.maxLength(100)),
    country: new FormControl('', Validators.maxLength(100)),
    phone: new FormControl('', Validators.maxLength(100)),
    password: new FormControl('', Validators.maxLength(64))
  });

  user: User

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.user = {
      Email: this.newUserForm.controls['email'].value,
      First_Name: this.newUserForm.controls['first_name'].value,
      Last_Name: this.newUserForm.controls['last_name'].value,
      Address: this.newUserForm.controls['address'].value,
      City: this.newUserForm.controls['city'].value,
      Country: this.newUserForm.controls['country'].value,
      Phone: this.newUserForm.controls['phone'].value,
      Password: this.newUserForm.controls['password'].value
    }

    console.log(this.user)
    this.service.register(this.user).subscribe((response) => {
      if(response.token && response.userID){
        localStorage.setItem('token', response.token);
        localStorage.setItem('email', response.userID);
        this.service.setLogged();
        this.router.navigate(['/validate']);
      }
    }, (response) => {
      alert(response.msg)
    });
  }

}
