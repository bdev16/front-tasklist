import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterModule } from '@angular/router';
import { ShareService } from '../../../../services/share.service';
import { ApiService } from '../../../../services/api.service';
import { Task } from '../../../../model/task';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { NotificationServiceService } from '../../../../services/notification-service.service'

@Component({
  selector: 'app-update-task',
  imports: [CommonModule, RouterModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule, MatNativeDateModule, ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit {
    visibleOptions: boolean = false;
    visibleLinksNavbarMobile: boolean = false;
  
    // dateString: string = '';
    dateString: string = '';
    dateForInput: Date = new Date(this.dateString);

    taskId: number = parseInt(sessionStorage.getItem('taskId')!);

    taskTitle: string = '';
    taskDescription: string = '';
    taskDate: string = this.dateString;
    taskStatus: number = 0;
    taskIdUser: string = localStorage.getItem('userId') ?? '';

    task: Task = new Task(
      this.taskTitle!, this.taskDescription!, this.taskDate, this.taskStatus, this.taskIdUser
    );

    viewProfile: boolean = false;

    userId: string = localStorage.getItem('userId') ?? '';
    userName: string = '';
    userEmail: string = '';
    userPassword: string = '';

    updateUserForm!: FormGroup;
    updateTaskForm!: FormGroup;
    
    constructor(
      private router: Router,
      private shareService: ShareService,
      private api: ApiService,
      private formBuilder: FormBuilder,
      private notification: NotificationServiceService
    ) {
    }

    ngOnInit(): void {
      console.log(this.taskId);
      this.updateUserForm = this.formBuilder.group({
        'UserName': [this.userName, Validators.required],
        'Email': [this.userEmail, Validators.required]
      });
      this.addGetTask();
      this.updateTaskForm = this.formBuilder.group({
        'taskTitle': [this.taskTitle, Validators.required],
        'taskDescription': [this.taskDescription, Validators.required],
        'taskDate': [this.taskDate, Validators.required],
        'taskStatus': [this.taskStatus, Validators.required]
      });
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
  
    addGetTask() {
      this.api.getTask(this.taskId).subscribe((response) => {
        this.task = response;
        this.taskTitle = response.title;
        this.taskDescription = response.description
        this.taskDate = response.date;
        this.dateForInput = new Date(this.formatStringDate(response.date));
        this.taskStatus = response.status;
        console.log(`Resposta do getTask: ${response.title}; \n${response.description}; \n${response.date}; \n${response.status}; \n${this.dateForInput}`);
      })
    }
      
  addUpdateTask() {
      
      if (this.updateTaskForm.value.taskTitle != '') {
        this.task.title = this.updateTaskForm.value.taskTitle;
      }
    
      if (this.updateTaskForm.value.taskDescription != '') {
        this.task.description = this.updateTaskForm.value.taskDescription;
      }
    
      if (this.updateTaskForm.value.taskDate != '') {
        this.task.date = this.updateTaskForm.value.taskDate;
      }
      
      if (this.updateTaskForm.value.taskStatus != 0) {
        this.task.status = this.updateTaskForm.value.taskStatus;
      }
      
      console.log(this.updateTaskForm.value);
      console.log(this.task);
      this.api.updateTask(this.taskId, this.task).subscribe({
        next: (response) => {
          console.log(response);
          this.notification.show('Tarefa modificada com sucesso');
        },
        error: (err) => {
          console.log(err);
          this.notification.show('Ocorreu um erro ao tentar atualizar a tarefa', true);
        }
      });
      // window.location.reload();
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

    onDateChange(event: any) {
      // const dateSelected = event.value
      // this.dateStringList.push(dateSelected);
      const inputElement = event.target as HTMLInputElement;
      if (inputElement) {
        const date = new Date(inputElement.value);
        this.dateString = this.formatDate(date);
      }
    }

    formatDate(date: Date): string {

      const localDate = new Date(date);

      localDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      const year = localDate.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');  // Meses começam em 0
      const day = String(date.getDate()).padStart(2, '0');
      return `${day}-${month}-${year}`;
    }

    formatStringDate(date: string): string {
      const [day, month, year] = date.split('-');
      return `${month}-${day}-${year}`;
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
