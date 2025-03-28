import { Component, OnInit, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../../model/user';
import { Task } from '../../../model/task';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../services/share.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule} from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule, MatNativeDateModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  visibleOptions: boolean = false;
  visibleLinksNavbarMobile: boolean = false;

  dataSource!: Task[];
  filter!: Task[];
  bottonFilterStatus: number | null = null;
  dateString: string = '';
  dateForInput: Date = new Date(this.dateString);
   
  
  id: string = '6031e80e-f93b-47c4-b52f-623854634bc3';
  userId: string = localStorage.getItem('userId') ?? '';
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';
  userTasks: Task[] = [];
  userToken: string = '';

  checkboxStyleValue: number = 1;

  viewProfile: boolean = false;

  updateUserForm!: FormGroup;

  userObject!: User;
  // userObject2: User = new User(this.userId, this.userObject.name, this.userObject.email, this.userPassword, this.userTasks, this.userToken); 

  constructor(
    private router: Router, private api: ApiService, private shareService: ShareService, private formBuilder: FormBuilder
  ) { }

  
  ngOnInit(): void {
    const savedDate = sessionStorage.getItem('dateString');
    const savedDateTypeDate = sessionStorage.getItem('dateForInput');
    this.dateString = savedDate ? savedDate : this.getCurrentDate();
    this.dateForInput = savedDateTypeDate ? new Date(savedDateTypeDate) : new Date(this.getCurrentDate());
    this.updateUserForm = this.formBuilder.group({
      'UserName': [this.userName, Validators.required],
      'Email': [this.userEmail, Validators.required]
    });
    this.addTasksForDate();
    this.addGetUser();
  }

  viewMobileOptions() {
    this.visibleOptions = !this.visibleOptions;
  }

  viewNavbarMobileOptions() {
    this.visibleLinksNavbarMobile = !this.visibleLinksNavbarMobile;
  }

  onDateChange(event: any) {
    // Isso recarrega a página quando a data for alterada
    const inputElement = event.target as HTMLInputElement;
    if (inputElement) {
      const date = new Date(inputElement.value);
      this.dateString = this.formatDate(date);
      console.log(this.dateString)
      sessionStorage.setItem('dateString', this.dateString);
      sessionStorage.setItem('dateForInput', date.toISOString());
    }
    console.log(this.dateString);
    window.location.reload();
  }

  formatDate(date: Date): string {

    const localDate = new Date(date);

    localDate.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    const year = localDate.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Meses começam em 0
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString(); 
  }

  reinicializeDate() {
    sessionStorage.removeItem('dateString');
  }

  addTasksForDate() {
    this.api.getTasksForDate(this.id, this.dateString).subscribe((response: any) => {
        console.log(response);
        this.dataSource = response;
      this.filter = response;
        console.log(this.dataSource);
      }
    )
  }

  addUpdateTask(taskId: number | undefined, taskObject: Task) {
    this.api.updateTask(taskId, taskObject).subscribe(_ => this.addTasksForDate());
    // window.location.reload();
  }

  addDeleteTask(taskId: number) {
    this.api.deleteTask(taskId).subscribe((response) => {
      console.log(response);
    })
    window.location.reload();
  }

  addGetUser() {
    this.api.getUser(this.userId).subscribe((response) => {
      this.userName = response.userName;
      this.userEmail = response.email
      this.userPassword = response.passwordHash;
      this.userTasks = response.tasks;
      this.userToken = response.token;
      this.userObject = new User(response.id, response.userName, response.email, response.passwordHash, response.tasks, response.token);
      console.log('Resposta do getuser: ');
      console.log(response);
    })
  }

  addUpdateUser() {
    this.api.updateUser(this.userId, this.updateUserForm.value).subscribe((response) => {
      console.log(response);
    });
  }

  addFilterInput(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    this.dataSource = this.filter.filter((task) => {
      return task.title?.toLowerCase().includes(value);
    })
  }

  filterByStatus(status: number) {
    if (this.bottonFilterStatus === status) {
      this.dataSource = [...this.filter]; 
      this.bottonFilterStatus = null;
    } else {
      this.dataSource = this.filter.filter(task => task.status === status);
      this.bottonFilterStatus = status;
    }
  }

  resetFilter() {
    this.dataSource = [...this.filter];
  }

  toggleCheckboxStatus(valueTaskId: number | undefined) {
    const task = this.dataSource.find(task => task.id === valueTaskId);
    // if (task) {
    //   task.status = task.status === 1 ? 2 : 1;
    // }
    if (task) {
      if (task.status == 1) {
        task.status = 2;
      } else {
        task.status = 1;
      }
      this.addUpdateTask(task.id, task);
    }
  }

  passingValueIdTask(taskId: number | undefined, num: number) {
    this.shareService.changeTaskId(taskId);
    sessionStorage.setItem('taskId', taskId!.toString());
    
    if (num == 1) {
      this.router.navigate(['/view-task']);
    }

    if (num == 2) {
      this.router.navigate(['/update-task']);
    }
    
  }

  toggleFormUserProfile() {
    this.viewProfile = !this.viewProfile;
  }

  renicializeDatasSavedOnSessionAndLocalStorage() {
    this.reinicializeDate();
    sessionStorage.clear();
    localStorage.clear();
  }

}
