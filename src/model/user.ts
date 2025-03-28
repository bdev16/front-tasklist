import { Task } from "./task";

export class User {
    userId?: string;
    name: string;
    email: string;
    password: string;
    tasks: Task[];
    token: string;
    
    constructor(userId: string, name: string, email: string, password: string, tasks: Task[], token: string) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.tasks = tasks;
        this.token = token;
    }
}