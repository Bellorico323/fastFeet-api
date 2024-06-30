import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import {
  Deliveryman,
  DeliverymanProps,
} from '@/domain/enterprise/entities/deliveryman'

export function makeDeliveryman(
  override: Partial<DeliverymanProps> = {},
  id?: UniqueEntityID,
) {
  const deliveryman = Deliveryman.create(
    {
      name: faker.person.fullName(),
      cpf: faker.internet.email(),
      password: faker.lorem.word(6),
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      ...override,
    },
    id,
  )

  return deliveryman
}
