export class CustomError {
  message!: string;
  status!: number;
  error!: any;

  constructor(message: string, status: number = 500, error: any = {}) {
    this.message = message;
    this.status = status;
    this.error = error;
  }
}
