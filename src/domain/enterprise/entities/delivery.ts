import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'
import { DeliveryStatus } from './value-objects/delivery-status'
import { AggregateRoot } from '@/core/entities/aggregate-root'

export interface DeliveryProps {
  recipientId: UniqueEntityID
  deliverymanId: UniqueEntityID
  status: DeliveryStatus
  dateOfWithdraw?: Date | null
  deliveryDate?: Date | null
  createdAt: Date
}

export class Delivery extends AggregateRoot<DeliveryProps> {
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

  set dateOfWithdraw(date: Date | null | undefined) {
    this.props.dateOfWithdraw = date
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
