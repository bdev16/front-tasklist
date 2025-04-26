export class Error {
    status: string;
    mensage?: string;

    constructor(status: string, mensage: string) {
        this.status = status;
        this.mensage = mensage;
    }
}