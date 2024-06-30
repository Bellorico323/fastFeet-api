import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DeliveryProps {
  recipientId: UniqueEntityID
  deliverymanId: UniqueEntityID
  status: string
  dateOfWithdraw: Date
  deliveryDate: Date
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
    props: Optional<DeliveryProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const delivery = new Delivery(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    )

    return delivery
  }
}
