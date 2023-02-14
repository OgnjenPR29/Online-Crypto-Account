import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from '../User';
import { User as UserPass} from '../Models/User';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
 //UserPass je User.ts sa passwordom
  
//ostavi zagrade zbog greske za undefined Email
  data:User={

  };
  
  
  dataUser: UserPass;
  userPass: UserPass;

  constructor(private profileService:ProfileService, private authService: AuthService, private http: HttpClient, private router: Router) {
   
  }


  ngOnInit() {
    this.profileService.getProfile().subscribe((response) => {
      if (response.success == false) {
        alert(response.msg);
        
      } else {
        this.data = response;
        
      }
    });
  
  }
  onSubmit(email:string, first_name:string, last_name:string, address:string, city:string, country:string, phone:string){

    const us:UserPass={
      Email: email,
      First_Name: first_name,
      Last_Name: last_name,
      Address: address,
      City :city,
      Country: country,
      Phone: phone,
      Password: ''
          
    }
    console.log(us);
 
    this.profileService.updateProfile(us).subscribe((response) => {
      this.router.navigate(['my-profile'])
    });
  }
 
}
