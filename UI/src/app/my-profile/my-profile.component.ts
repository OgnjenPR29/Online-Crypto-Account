import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ProfileService } from '../services/profile.service';
import { User } from '../User';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  
  profile: User;
  loaded = false;

  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

   this.profileService.getProfile().subscribe((response) => {
    if (response.success === false) {
      alert(response.msg);
      this.router.navigate(['/login']);
    } else {
      this.profile = response;
      this.loaded = true;
    }
  },
  (error) => {
    this.router.navigate(['/login']);
  } 
  );

  }

}
