import { Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TaskListComponent } from './components/task-list/task-list.component';
import { RegisterTaskComponent } from './components/register-task/register-task.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterUserComponent } from './components/register-user/register-user.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },

    {
        path: "home",
        component: HomeComponent
    },

    {
        path: "Task/Create",
        component: RegisterTaskComponent
    },

    {
        path: "Task/Update",
        component: RegisterTaskComponent
    },

    {
        path: "Task/View",
        component: RegisterTaskComponent
    },

    {
        path: "User",
        component: UserListComponent
    },

    {
        path: "User/Create",
        component: RegisterUserComponent
    }

];
