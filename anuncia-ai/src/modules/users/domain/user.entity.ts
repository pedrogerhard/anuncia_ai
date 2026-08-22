import { randomUUID } from 'node:crypto';
import { UserAlreadyDeletedError } from './errors/user-already-deleted.error';

export interface UserProps {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  phone: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  /** Cria um usuário novo, gerando id e timestamps. */
  static create(input: {
    name: string;
    email: string;
    passwordHash: string;
    phone: string;
  }): User {
    const now = new Date();

    return new User({
      id: randomUUID(),
      name: input.name,
      email: input.email,
      passwordHash: input.passwordHash,
      phone: input.phone,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  /** Faz soft delete do usuário. */
  delete(): void {
    if (this.props.deletedAt !== null) {
      throw new UserAlreadyDeletedError(this.props.id);
    }

    const now = new Date();

    this.props.deletedAt = now;
    this.props.updatedAt = now;
  }

  /** Reconstrói um usuário já existente a partir de dados persistidos (sem reaplicar regras de criação). */
  static restore(props: UserProps): User {
    return new User(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  get phone(): string {
    return this.props.phone;
  }

  get deletedAt(): Date | null {
    return this.props.deletedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }
}
