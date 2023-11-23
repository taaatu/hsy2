/** Error with status and message */
export default class CustomError extends Error {
  status = 500;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
