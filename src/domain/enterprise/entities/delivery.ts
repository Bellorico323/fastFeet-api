import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { DeliveryStatus } from './value-objects/delivery-status'

export interface DeliveryProps {
  recipientId: UniqueEntityID
  deliverymanId: UniqueEntityID
  status: DeliveryStatus
  dateOfWithdraw: Date | null
  deliveryDate: Date | null
  createdAt: Date
}

export class Delivery extends Entity<DeliveryProps> {
  get recipientId() {
    return this.props.recipientId
  }

  get deliverymanId() {
    return this.props.deliverymanId
  }

  get status() {
    return this.props.status
  }

  get dateOfWithdraw() {
    return this.props.dateOfWithdraw
  }

  get deliveryDate() {
    return this.props.deliveryDate
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<DeliveryProps, 'createdAt' | 'status'>,
    id?: UniqueEntityID,
  ) {
    const delivery = new Delivery(
      {
        ...props,
        createdAt: new Date(),
        status: DeliveryStatus.create(),
      },
      id,
    )

    return delivery
  }
}
