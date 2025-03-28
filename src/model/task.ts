export class Task {
    id?: number;
    title: string;
    description: string;
    date: string;
    status: number;
    userId: string;

    constructor(title: string, description: string, date: string, status: number, userId: string) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.status = status;
        this.userId = userId;
    }
}