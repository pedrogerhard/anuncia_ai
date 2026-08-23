import { BcryptPasswordHasher } from './bcrypt-password-hasher';

describe('BcryptPasswordHasher', () => {
  const hasher = new BcryptPasswordHasher();

  it('deve gerar um hash diferente da senha original', async () => {
    // Arrange
    const plain = 'senhaSuperSecreta123';

    // Act
    const hash = await hasher.hash(plain);

    // Assert
    expect(hash).not.toBe(plain);
  });

  it('deve confirmar que a senha correta bate com o hash gerado', async () => {
    // Arrange
    const plain = 'senhaSuperSecreta123';
    const hash = await hasher.hash(plain);

    // Act
    const result = await hasher.compare(plain, hash);

    // Assert
    expect(result).toBe(true);
  });

  it('deve confirmar que uma senha incorreta não bate com o hash', async () => {
    // Arrange
    const plain = 'senhaSuperSecreta123';
    const hash = await hasher.hash(plain);

    // Act
    const result = await hasher.compare('senhaErrada456', hash);

    // Assert
    expect(result).toBe(false);
  });
});
