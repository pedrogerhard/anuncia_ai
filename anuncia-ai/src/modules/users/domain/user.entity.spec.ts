import { UserAlreadyDeletedError } from './errors/user-already-deleted.error';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { User } from './user.entity';

describe('User', () => {
  describe('create', () => {
    it('deve criar um usuário novo com deletedAt nulo e um id válido', () => {
      // Arrange: prepara os dados de entrada
      const input = {
        name: 'Pedro Teste',
        email: 'pedro@teste.com',
        passwordHash: 'hash-fake-nao-e-a-senha-real',
        phone: '11999999999',
      };

      // Act: executa a ação que está sendo testada
      const user = User.create(input);

      // Assert: verifica se o resultado é o esperado
      expect(user.id).toBeDefined();
      expect(user.name).toBe(input.name);
      expect(user.email).toBe(input.email);
      expect(user.deletedAt).toBeNull();
    });
  });

  describe('delete', () => {
    it('deve marcar o usuário como deletado', () => {
      // Arrange: cria um usuário para ser deletado
      const user = User.create({
        name: 'Pedro Teste',
        email: 'pedro@teste.com',
        passwordHash: 'hash-fake-nao-e-a-senha-real',
        phone: '11999999999'
      });

      // Act: executa a ação de deletar o usuário
      user.delete();

      // Assert: verifica se o resultado é o esperado
      expect(user.deletedAt).not.toBeNull();
      expect(user.deletedAt).toBeInstanceOf(Date);
    });

    it('deve lançar um erro se o usuário já estiver deletado', () => {
      // Arrange: cria um usuário e o deleta
            const user = User.create({
        name: 'Pedro Teste',
        email: 'pedro@teste.com',
        passwordHash: 'hash-fake-nao-e-a-senha-real',
        phone: '11999999999'
      });
      user.delete();

      // Act & Assert: tenta deletar novamente e espera um erro
      expect(() => user.delete()).toThrow(UserAlreadyDeletedError);
    });
  });
});
