import { PaginationParams } from '@/core/repositories/pagination-params'
import { Recipient } from '../../enterprise/entities/recipient'

export abstract class RecipientRepository {
  abstract findById(id: string): Promise<Recipient | null>
  abstract findMany(params: PaginationParams): Promise<Recipient[]>
  abstract create(recipient: Recipient): Promise<void>
  abstract save(recipient: Recipient): Promise<void>
  abstract delete(recipient: Recipient): Promise<void>
}
