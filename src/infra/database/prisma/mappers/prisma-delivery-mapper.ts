import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'
import { DeliveryStatus } from '@/domain/delivery/enterprise/entities/value-objects/delivery-status'
import { Delivery as PrismaDelivery } from '@prisma/client'

export class PrismaDeliveryMapper {
  static toDomain(raw: PrismaDelivery): Delivery {
    return Delivery.create(
      {
        deliverymanId: new UniqueEntityID(raw.deliverymanId),
        recipientId: new UniqueEntityID(raw.recipientId),
        status: DeliveryStatus.toStatus(raw.status),
        dateOfWithdraw: raw.dateOfWithdraw,
        deliveryDate: raw.deliveryDate,
        createdAt: raw.createdAt,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(delivery: Delivery): PrismaDelivery {
    return {
      id: delivery.id.toString(),
      deliverymanId: delivery.deliverymanId.toString(),
      recipientId: delivery.recipientId.toString(),
      status: delivery.status.toString(),
      dateOfWithdraw: delivery.dateOfWithdraw ?? null,
      deliveryDate: delivery.deliveryDate ?? null,
      createdAt: delivery.createdAt,
    }
  }
}
