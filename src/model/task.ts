export class Task {
    id?: number;
    title: string;
    description: string;
    date: Date;
    status: number;
    userId: Number;

    constructor(title: string, description: string, date: Date, status: number, userId: Number) {
        this.title = title;
        this.description = description;
        this.date = date;
        this.status = status;
        this.userId = userId;
    }
}