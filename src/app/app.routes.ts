import { Routes } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { ViewTaskComponent } from './components/task/view-task/view-task.component';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { UpdateTaskComponent } from './components/task/update-task/update-task.component';
import { RegisterComponent } from './components/authentication/register/register.component';

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
        path: "view-task",
        component: ViewTaskComponent
    },

    {
        path: "create-task",
        component: CreateTaskComponent
    },

    {
        path: "update-task",
        component: UpdateTaskComponent
    },

    {
        path: "register",
        component: RegisterComponent
    }

];
