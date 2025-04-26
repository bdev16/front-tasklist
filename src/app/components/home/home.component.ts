import { Component, OnInit, NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { User } from '../../../model/user';
import { Task } from '../../../model/task';
import { Error } from '../../../model/error';
import { ApiService } from '../../../services/api.service';
import { Router } from '@angular/router';
import { ShareService } from '../../../services/share.service';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NotificationServiceService } from '../../../services/notification-service.service'


@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, FormsModule, MatNativeDateModule, ReactiveFormsModule, MatDialogModule],
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
   
  
  // id: string = '6031e80e-f93b-47c4-b52f-623854634bc3';
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

  errorGetTasks!: Error;
  errorGetStatus: string = '';
  errorGetMessage: string = '';
  tasksExist: boolean = false;

  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router, private api: ApiService, private shareService: ShareService,
    private formBuilder: FormBuilder, private notification: NotificationServiceService
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
    this.api.getTasksForDate(this.userId, this.dateString).subscribe({
        next: (response) => {
          console.log(response);
          this.dataSource = response;
          this.filter = response;
          console.log(this.dataSource);
          this.tasksExist = true;
        },
        error: (err) => {
          console.log(err);
          this.errorGetStatus = err.error.status;
          this.errorGetMessage = err.error.message;
          this.tasksExist = false;
        }
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
    this.api.getUser(this.userId).subscribe({
      next: (response) => {
        this.userName = response.userName;
        this.userEmail = response.email
        this.userPassword = response.passwordHash;
        this.userTasks = response.tasks;
        this.userToken = response.token;
        this.userObject = new User(response.id, response.userName, response.email, response.passwordHash, response.tasks, response.token);
        console.log('Resposta do getuser: ');
        console.log(response);
      },
      error: (err) => {
        console.log(err);
      }
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

  openDialog(taskId: number) {
    this.dialog.open(DialogRemove, {data: { taskId }});
  }

}

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'dialog-remove',
  template: `<h2 mat-dialog-title>Deletar tarefa</h2>
  <mat-dialog-content>
    Você realmente deseja deletar essa tarefa??
  </mat-dialog-content>
  <mat-dialog-actions class="actions">
    <button mat-button mat-dialog-close class="custom-btn">Não</button>
    <button mat-button mat-dialog-close cdkFocusInitial class="custom-btn confirm" (click)="addDeleteTask()">Sim</button>
  </mat-dialog-actions>`,
  styles: [`
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }

    .custom-btn{
      border: none;
      border-radius: 5px;
      background-color:rgb(172, 172, 172);
    }

    .custom-btn:hover {
      cursor: pointer;
      background-color:rgb(114, 114, 114);
    }
    `],
  imports: [MatDialogModule],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogRemove {
  readonly dialogRef = inject(MatDialogRef<DialogRemove>);
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { taskId: number }, private api: ApiService, private notification: NotificationServiceService
  ) { }
  
  addDeleteTask() {
    let taskId = this.data.taskId;
    this.api.deleteTask(taskId).subscribe({
      next: (response) => {
        console.log(response);
        this.notification.show('Tarefa deletada com sucesso');
      },
      error: (err) => {
        console.log(err);
        this.notification.show('Ocorreu um erro ao tentar deletar a tarefa', true);
      }
    })
    // window.location.reload();
  }
}
