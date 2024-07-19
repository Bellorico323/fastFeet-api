import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Recipient } from '@/domain/delivery/enterprise/entities/recipient'
import { Recipient as PrismaRecipient } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class PrismaRecipientMapper {
  static toDomain(raw: PrismaRecipient): Recipient {
    return Recipient.create(
      {
        name: raw.name,
        latitude: Number(raw.latitude),
        longitude: Number(raw.longitude),
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(recipient: Recipient): PrismaRecipient {
    return {
      id: recipient.id.toString(),
      name: recipient.name,
      latitude: new Decimal(recipient.latitude),
      longitude: new Decimal(recipient.longitude),
    }
  }
}
