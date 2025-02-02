import { Task } from "./task";

export class User {
    id?: number;
    name: string;
    email: string;
    password: string;
    tasks: Task[];
    
    constructor(name: string, email: string, password: string, tasks: Task[]) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.tasks = tasks;
    }
}