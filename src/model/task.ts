export class Task {
    taskId: number;
    title: string;
    description: string;
    date: Date;
    status: number;

    constructor(taskId: number, title: string, description: string, date: Date, status: number) {
        this.taskId = taskId;
        this.title = title;
        this.description = description;
        this.date = date;
        this.status = status;
    }
}