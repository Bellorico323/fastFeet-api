import { RecipientRepository } from '@/domain/application/repositories/recipient-repository'
import { Recipient } from '@/domain/enterprise/entities/recipient'

export class InMemoryRecipientRepository implements RecipientRepository {
  public items: Recipient[] = []

  async findById(id: string): Promise<Recipient | null> {
    const recipient = this.items.find(
      (recipient) => recipient.id.toString() === id,
    )

    if (!recipient) {
      return null
    }

    return recipient
  }

  async create(recipient: Recipient): Promise<void> {
    this.items.push(recipient)
  }
}
