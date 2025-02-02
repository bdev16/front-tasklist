import { CommonModule } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShareService } from '../../../services/share.service';
import { ApiService } from '../../../services/api.service';
import { User } from '../../../model/user';
import { Task } from '../../../model/task';

@Component({
  selector: 'app-register-user',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent implements AfterViewInit{
  isDisabled = false;

  titleComponent = "";

  registerOrUpdate!: Number;

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    tasks: []
  };

  id = 0;
  name = "";
  email = "";
  password = "";
  tasks: Task[] = [];

  constructor(
      private shareService: ShareService,
      private apiService: ApiService,
      private cdr: ChangeDetectorRef 
    )
  { }
  
  ngAfterViewInit(): void {
    this.shareService.value.subscribe(
      value => this.registerOrUpdate = value
    );
    this.shareService.valueUser.subscribe(user => {
      if (user != null) {
        this.user = user;
        this.fillFilds(this.user);
        this.cdr.detectChanges();
      } else {
        console.log(user);
      }
    })
    this.shareService.valueAtribute.subscribe(
      value => this.isDisabled = Boolean(value)
    );
    this.shareService.valueTitle.subscribe(
      value => this.titleComponent = String(value)
    );
    this.cdr.detectChanges(); 
  }

  createUser() {
    console.log(new User(this.name, this.email, this.password, this.tasks));
    this.apiService.registerUser({ name: this.name, email: this.email, password: this.password, tasks: this.tasks }).subscribe((response: any) => {
      console.log(response);
    })
  }

  updateUser() {
    this.apiService.updateUser(this.id, { id: this.id, name: this.name, email: this.email, password: this.password, tasks: this.tasks }).subscribe((response: any) => {
      console.log(response);
    })
  }

  fillFilds(user: User) {
    this.id = Number(user.id);
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.tasks = user.tasks;
  }
  

  modifiedTitleComponent(value: String) {
    this.titleComponent = String(value);
  }
}
