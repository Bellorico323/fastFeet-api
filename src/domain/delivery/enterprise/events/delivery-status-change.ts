import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { DomainEvent } from '@/core/events/domain-event'
import { Delivery } from '../entities/delivery'
import { DeliveryStatus } from '../entities/value-objects/delivery-status'

export class DeliveryStatusChangeEvent implements DomainEvent {
  public ocurredAt: Date
  public delivery: Delivery
  public status: DeliveryStatus

  constructor(delivery: Delivery, status: DeliveryStatus) {
    this.delivery = delivery
    this.status = status
    this.ocurredAt = new Date()
  }

  getAggregateId(): UniqueEntityID {
    return this.delivery.id
  }
}
