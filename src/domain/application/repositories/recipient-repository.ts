import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/enterprise/entities/recipient'

export interface RecipientRepository {
  create(recipient: Recipient): Promise<void>
  findById(id: UniqueEntityID): Promise<Recipient>
}
