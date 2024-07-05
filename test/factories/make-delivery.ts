import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import {
  Delivery,
  DeliveryProps,
} from '@/domain/delivery/enterprise/entities/delivery'
import { DeliveryStatus } from '@/domain/delivery/enterprise/entities/value-objects/delivery-status'
import { faker } from '@faker-js/faker'

export function makeDelivery(
  override: Partial<DeliveryProps> = {},
  id?: UniqueEntityID,
) {
  const delivery = Delivery.create(
    {
      recipientId: new UniqueEntityID(),
      deliverymanId: new UniqueEntityID(),
      status: DeliveryStatus.create(),
      dateOfWithdraw: faker.date.past(),
      deliveryDate: faker.date.future(),
      ...override,
    },
    id,
  )

  return delivery
}
