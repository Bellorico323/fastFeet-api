import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Recipient,
  RecipientProps,
} from '@/domain/enterprise/entities/recipient'

export function makeRecipient(
  override: Partial<RecipientProps> = {},
  id?: UniqueEntityID,
) {
  const recipient = Recipient.create(
    {
      name: faker.person.fullName(),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return recipient
}
