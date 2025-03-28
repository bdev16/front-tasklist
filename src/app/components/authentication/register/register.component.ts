import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { User } from '../../../../model/user';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../../services/share.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  visibleOptions: boolean = false;
  visibleLinksNavbarMobile: boolean = false;

  registerForm!: FormGroup;

  constructor(private router: Router, private api: ApiService, 
    private formBuilder: FormBuilder)
  { 
    this.registerForm = this.formBuilder.group({
      'UserName': [null, Validators.required],
      'Email': [null, Validators.required],
      'Password': [null, Validators.required]
    });
  }

  ngOnInit() { }

  viewNavbarMobileOptions() {
    this.visibleLinksNavbarMobile = !this.visibleLinksNavbarMobile;
  }

  addRegisterUser() {
    this.api.registerUser(this.registerForm.value).subscribe((response) => {
      console.log(response);
    })
  }

}
