import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { User } from '../../../../model/user';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../../services/share.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  visibleOptions: boolean = false;
  visibleLinksNavbarMobile: boolean = false;

  loginForm!: FormGroup;
  email: String = '';
  password: String = '';
  dataSource!: User;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiService, private shareService: ShareService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'Email': [null, Validators.required],
      'Password': [null, Validators.required]
    });
  }
    
  addlogin() {
    this.isLoadingResults = true;
    this.api.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.dataSource = response;
        localStorage.setItem("jwt", this.dataSource.token);
        localStorage.setItem("userId", this.dataSource.userId ?? '');
        this.isLoadingResults = false;
        this.router.navigate(['/home']);
        console.log(response.userId);
        console.log(response);
      },
      error: (err) => {
        console.log(err);
        this.isLoadingResults = false;
      }
    });
  }

  viewNavbarMobileOptions() {
    this.visibleLinksNavbarMobile = !this.visibleLinksNavbarMobile;
  }

}
