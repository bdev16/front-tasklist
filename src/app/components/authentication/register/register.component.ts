import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { User } from '../../../../model/user';
import { ApiService } from '../../../../services/api.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../../services/share.service';
import { NotificationServiceService } from '../../../../services/notification-service.service';

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

  isTypePassword: boolean = true;

  constructor(private router: Router, private api: ApiService, 
    private formBuilder: FormBuilder, private notification: NotificationServiceService)
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
    this.api.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        console.log(response);
        this.notification.show('Cadastro feito com sucesso');
      },
      error: (err) => {
        console.log(err);
        this.notification.show('Ocorreu um erro ao realizar o cadastro', true);
      }
    })
  } 

  viewPassword() {
    if (this.isTypePassword) {
      this.isTypePassword = false;
    } else {
      this.isTypePassword = true;
    }
  }

}
