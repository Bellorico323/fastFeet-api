import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { faker } from '@faker-js/faker'
import { Delivery, DeliveryProps } from '@/domain/enterprise/entities/delivery'
import { DeliveryStatus } from '@/domain/enterprise/entities/value-objects/delivery-status'

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
