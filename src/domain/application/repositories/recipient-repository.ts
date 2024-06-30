import { PaginationParams } from '@/core/repositories/pagination-params'
import { Recipient } from '@/domain/enterprise/entities/recipient'

export interface RecipientRepository {
  findById(id: string): Promise<Recipient | null>
  findMany(params: PaginationParams): Promise<Recipient[]>
  create(recipient: Recipient): Promise<void>
  save(recipient: Recipient): Promise<void>
  delete(recipient: Recipient): Promise<void>
}
