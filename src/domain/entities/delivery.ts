import { Entity } from "@/core/entities/entity"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

export interface DeliveryProps {
  recipientId: UniqueEntityId 
  deliverymanId: UniqueEntityId
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

}