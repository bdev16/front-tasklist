import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { ShareService } from '../../../../services/share.service';
import { ApiService } from '../../../../services/api.service';
import { Task } from '../../../../model/task';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-view-task',
  imports: [CommonModule, RouterModule ,ReactiveFormsModule],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent implements OnInit {

  visibleOptions: boolean = false;
  visibleLinksNavbarMobile: boolean = false;

  taskId!: number;
  task: Task = new Task(
    '', '', '', 1, ''
  );

  taskTitle: string = this.task.title;
  taskDescription: string = this.task.description;
  taskDate: string = this.task.date;
  taskStatus: number = this.task.status;
  taskIdUser: string = this.task.userId;

  viewProfile: boolean = false;

  userId: string = localStorage.getItem('userId') ?? '';
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';

  updateUserForm!: FormGroup;

  constructor(
    private router: Router,
    private shareService: ShareService,
    private api: ApiService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    console.log(this.taskId);
    this.updateUserForm = this.formBuilder.group({
      'UserName': [this.userName, Validators.required],
      'Email': [this.userEmail, Validators.required]
    });
    this.shareService.taskId.subscribe(
      taskId => this.taskId = taskId
    );
    this.addGetTask();
  }

  addGetTask() {
    this.api.getTask(this.taskId).subscribe((response) => {
      this.task = response;
      this.taskTitle = response.title;
      this.taskDescription = response.description
      this.taskDate = response.date;
      this.taskStatus = response.status;
    })
  }

  addGetUser() {
    this.api.getUser(this.userId).subscribe((response) => {
      this.userName = response.userName;
      this.userEmail = response.email
      console.log(response);
    })
  }

  addUpdateUser() {
    this.api.updateUser(this.userId, this.updateUserForm.value).subscribe((response) => {
      console.log(response);
    });
  }

  viewMobileOptions() {
    this.visibleOptions = !this.visibleOptions;
  }

  viewNavbarMobileOptions() {
    this.visibleLinksNavbarMobile = !this.visibleLinksNavbarMobile;
  }

  toggleFormUserProfile() {
    this.viewProfile = !this.viewProfile;
  }

  reinicializeDate() {
    sessionStorage.removeItem('dateString');
  }

  renicializeDatasSavedOnSessionAndLocalStorage() {
    this.reinicializeDate();
    sessionStorage.clear();
    localStorage.clear();
  }

}
