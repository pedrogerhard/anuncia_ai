import { randomUUID } from 'node:crypto';
import { Prisma } from '../../../../generated/prisma/client';

export interface ListingProps {
  id: string;
  title: string;
  description: string;
  price: Prisma.Decimal;
  status: Status;
  ownerId: string;
  deletedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export enum Status {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Sold = 'SOLD',
}

export class Listing {
  private constructor(private readonly props: ListingProps) {}

  /** Cria um anúncio novo, gerando id e timestamps. */
  static create(input: {
    title: string;
    description: string;
    price: Prisma.Decimal;
    ownerId: string;
  }): Listing {
    const now = new Date();

    return new Listing({
      id: randomUUID(),
      title: input.title,
      description: input.description,
      price: input.price,
      ownerId: input.ownerId,
      status: Status.Active,
      deletedAt: null,
      createdAt: now,
      updatedAt: now,
    });
  }

  /** Reconstrói um anúncio já existente a partir de dados persistidos (sem reaplicar regras de criação). */
  static restore(props: ListingProps): Listing {
    return new Listing(props);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string {
    return this.props.description;
  }

  get price(): Prisma.Decimal {
    return this.props.price;
  }

  get status(): Status {
    return this.props.status;
  }

  get ownerId(): string {
    return this.props.ownerId;
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
