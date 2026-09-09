import { RegisterUserUseCase } from './register-user.use-case';
import type { UserRepository } from '../domain/user.repository';
import type { PasswordHasher } from '../domain/password-hasher';
import { User } from '../domain/user.entity';
import { UserAlreadyExistsError } from '../domain/errors/user-already-exists.error';

describe('RegisterUserUseCase', () => {
  it('deve impedir o registro de um usuário com email já existente', async () => {
    // Arrange: monta um repository falso que já "conhece" um usuário com esse email
    const existingUser = User.create({
      name: 'Pedro Teste',
      email: 'emailigual@teste.com',
      passwordHash: 'hash-fake-nao-e-a-senha-real',
      phone: '11999999999',
    });

    const saveMock = jest.fn();
    const userRepository: UserRepository = {
      findByEmail: jest.fn().mockResolvedValue(existingUser),
      save: saveMock,
    };

    const passwordHasher: PasswordHasher = {
      hash: jest.fn(),
      compare: jest.fn(),
    };

    const useCase = new RegisterUserUseCase(userRepository, passwordHasher);

    // Act & Assert: tenta registrar outro usuário com o mesmo email
    await expect(
      useCase.execute({
        name: 'João Teste',
        email: 'emailigual@teste.com',
        password: 'senha1234',
        phone: '11988888888',
      }),
    ).rejects.toThrow(UserAlreadyExistsError);

    // Assert extra: confirma que o use case nem tentou salvar o novo usuário
    expect(saveMock).not.toHaveBeenCalled();
  });
});
