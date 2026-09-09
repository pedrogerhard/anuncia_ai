import { Listing } from './listing.entity';

export interface ListingRepository {
  findById(id: string): Promise<Listing | null>;
  save(listing: Listing): Promise<void>;
}

export const LISTING_REPOSITORY = Symbol('LISTING_REPOSITORY');
