export class UserAlreadyDeletedError extends Error {
  constructor(id: string) {
    super(`Usuário ${id} já está excluído`);
    this.name = 'UserAlreadyDeletedError';
  }
}
