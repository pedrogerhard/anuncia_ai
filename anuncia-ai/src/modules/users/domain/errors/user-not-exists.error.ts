export class UserNotExistsError extends Error {
  constructor(email: string) {
    super(`Usuário com email ${email} não existe`);
    this.name = 'UserNotExistsError';
  }
}
