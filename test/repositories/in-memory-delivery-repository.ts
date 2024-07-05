import { PaginationParams } from '@/core/repositories/pagination-params'

import { InMemoryRecipientRepository } from './in-memory-recipients-repository'
import { CoordinatesComparer } from '@/core/entities/coordinates-comparer'
import {
  DeliveryRepository,
  FindManyNearByParams,
} from '@/domain/delivery/application/repositories/delivery-repository'
import { DeliveryAttachmentRepository } from '@/domain/delivery/application/repositories/delivery-attachment-repository'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'
import { DomainEvents } from '@/core/events/domain-events'

export class InMemoryDeliveryRepository implements DeliveryRepository {
  constructor(
    private deliveryAttachmentsRepository: DeliveryAttachmentRepository,
    private recipientRepository: InMemoryRecipientRepository,
  ) {}

  public items: Delivery[] = []

  async findById(id: string): Promise<Delivery | null> {
    const delivery = this.items.find(
      (delivery) => delivery.id.toString() === id,
    )

    if (!delivery) {
      return null
    }

    return delivery
  }

  async findManyByDeliverymanId(
    deliverymanId: string,
    { page }: PaginationParams,
  ): Promise<Delivery[]> {
    const deliveries = this.items
      .filter((item) => item.deliverymanId.toString() === deliverymanId)
      .slice((page - 1) * 20, page * 20)

    return deliveries
  }

  async findManyNearByDeliveryman(
    params: FindManyNearByParams,
  ): Promise<Delivery[]> {
    return this.items.filter((item) => {
      const recipient = this.recipientRepository.items.find(
        (recipient) => recipient.id === item.recipientId,
      )

      if (!recipient) {
        return null
      }

      const distance = CoordinatesComparer.getDistanceBetweenTwoCoordinates(
        {
          latitude: params.latitude,
          longitude: params.longitude,
        },
        {
          latitude: recipient.latitude,
          longitude: recipient.longitude,
        },
      )

      return distance < 10
    })
  }

  async create(delivery: Delivery): Promise<void> {
    this.items.push(delivery)

    DomainEvents.dispatchEventsForAggregate(delivery.id)
  }

  async save(delivery: Delivery): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === delivery.id)

    await this.deliveryAttachmentsRepository.createMany(
      delivery.attachment.getNewItems(),
    )

    await this.deliveryAttachmentsRepository.deleteMany(
      delivery.attachment.getRemovedItems(),
    )

    this.items[itemIndex] = delivery

    DomainEvents.dispatchEventsForAggregate(delivery.id)
  }

  async delete(delivery: Delivery): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === delivery.id)

    this.items.splice(itemIndex, 1)
  }
}
