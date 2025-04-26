import { Component, OnInit} from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../../../model/user';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../../services/share.service';
import { NotificationServiceService } from '../../../../services/notification-service.service';

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

  isTypePassword: boolean = true;

  constructor(private router: Router, private api: ApiService, private shareService: ShareService,
    private formBuilder: FormBuilder, private notification: NotificationServiceService) { }

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
        this.notification.show('Login feito com sucesso');
        this.router.navigate(['/home']);
        console.log(response.userId);
        console.log(response);
      },
      error: (err) => {
        console.log(err);
        this.notification.show('Ocorreu um erro ao fazer o login', true);
        this.isLoadingResults = false;
      }
    });
  }

  viewNavbarMobileOptions() {
    this.visibleLinksNavbarMobile = !this.visibleLinksNavbarMobile;
  }

  viewPassword() {
    if (this.isTypePassword) {
      this.isTypePassword = false;
    } else {
      this.isTypePassword = true;
    }
  }

}
