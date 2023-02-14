import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Validate } from '../Models/Validate';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  validate:Validate
  message:string = ''

  validationForm=new FormGroup({
    email: new FormControl('', Validators.email),
    CardNumber: new FormControl('', Validators.required),
    CardCode: new FormControl('', Validators.required)
  });

  constructor(private service:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.validate = {
      CardNumber: this.validationForm.controls['CardNumber'].value,
      CardCode: this.validationForm.controls['CardCode'].value
    }

    this.service.validate(this.validate).subscribe( (response) => {
      this.router.navigate(['/my-profile'])
      localStorage.setItem('validated', 'true');
    }, (response) => {
      this.message = 'Validation failed, try again.'
    })
  }

}
