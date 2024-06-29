import { Recipient } from '@/domain/enterprise/entities/recipient'

export interface RecipientRepository {
  create(recipient: Recipient): Promise<void>
  findById(id: string): Promise<Recipient | null>
}
