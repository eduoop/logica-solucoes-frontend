export class ApiException extends Error {
  public readonly message: string = '';
  public readonly errors: {[key: string]: string} = {};
  constructor(message: string, errors: {[key: string]: string} = {}) {
    super();

    this.message = message;
    this.errors = errors;
  }
}
