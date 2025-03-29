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


@Component({
  selector: 'app-create-task',
  imports: [CommonModule, RouterModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule, MatNativeDateModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {

  visibleOptions: boolean = false;
  visibleLinksNavbarMobile: boolean = false;

  taskId!: number;

  taskTitle: string | null = sessionStorage.getItem('valueRegisterTaskTitle');
  taskDescription: string | null  = sessionStorage.getItem('valueRegisterTaskDescription');
  taskDate: string = '';
  taskStatus: number | null = parseInt(sessionStorage.getItem('valueRegisterTaskStatus')!);
  taskIdUser: string = localStorage.getItem('userId') ?? '';

  task: Task = new Task(
    this.taskTitle!, this.taskDescription!, this.taskDate, 1, this.taskIdUser
  );

  viewProfile: boolean = false;

  userId: string = localStorage.getItem('userId') ?? '';
  userName: string = '';
  userEmail: string = '';
  userPassword: string = '';

  updateUserForm!: FormGroup;
  registerUserForm!: FormGroup;

  // dateString: string = '';
  dateString: string = '';
  dateForInput: Date = new Date(this.dateString);
  dateStringList: string[] = [];
  
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
    this.registerUserForm = this.formBuilder.group({
      'taskTitle': [this.taskTitle, Validators.required],
      'taskDescription': [this.taskDescription, Validators.required],
      'taskStatus': [this.taskStatus, Validators.required]
    });
    this.shareService.taskId.subscribe(
      taskId => this.taskId = taskId
    );
    this.reloadDataListValues();
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

  addRegisterTask() {
    for (let date in this.dateStringList) {
      console.log(`date: ${date}`);
      console.log(`date: ${this.dateStringList[date]}`)
      this.task.date = this.dateStringList[date];
      this.api.registerTask(this.task).subscribe((response) => {
        console.log(response);
      });
    }
    this.reinicializeDatasForFormRegisterTask();
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
      const dateIncludesInDateStringList = this.dateStringList.includes(this.dateString);
      if (!dateIncludesInDateStringList) {
        this.dateStringList.push(this.dateString);
        sessionStorage.setItem('dateStringList', JSON.stringify(this.dateStringList));
      } 
    }
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

  reinicializeDate() {
    sessionStorage.removeItem('dateString');
  }

  reloadDataListValues() {
    const valueSaved = sessionStorage.getItem('dateStringList');
    if (valueSaved) {
      this.dateStringList = JSON.parse(valueSaved);
    }
  }

  reinicializeValueListDate(trueOrFalse: boolean, realodOrNo: boolean) {
    if (trueOrFalse && !realodOrNo) {
      sessionStorage.removeItem('dateStringList');
      // window.location.reload();
    }
    if (trueOrFalse && realodOrNo) {
      sessionStorage.removeItem('dateStringList');
      window.location.reload();
    }
  }

  removeTheLastDateForTheList() {
    if (this.dateStringList.length > 0) {
      this.dateStringList.pop();
      sessionStorage.setItem('dateStringList', JSON.stringify(this.dateStringList));
    }
  }

  saveDatasTaskForForm(num: number, event: any) {
    
    const inputElement = event.target as HTMLInputElement;
    
    if (num == 1) {
      sessionStorage.setItem('valueRegisterTaskTitle', inputElement.value);
      
    }
    if (num == 2) {
      sessionStorage.setItem('valueRegisterTaskDescription', inputElement.value);

    }
    if (num == 3) {
      sessionStorage.setItem('valueRegisterTaskStatus', inputElement.value);
    }

  }

  reinicializeDatasForFormRegisterTask() {
    this.reinicializeValueListDate(true, false);
    sessionStorage.removeItem('valueRegisterTaskTitle');
    sessionStorage.removeItem('valueRegisterTaskDescription');
    sessionStorage.removeItem('valueRegisterTaskStatus');
  }

  renicializeDatasSavedOnSessionAndLocalStorage() {
    this.reinicializeDate();
    sessionStorage.clear();
    localStorage.clear();
  }

}
