import { Entity } from "@/core/entities/entity"
import { UniqueEntityID } from "@/core/entities/unique-entity-id"
import { randomUUID } from "node:crypto"

export interface DeliveryManProps {
  name: string
  cpf: string
  latitude: number
  longitude: number
}

export class Deliveryman extends Entity<DeliveryManProps> {
  get name() {
    return this.props.name
  }

  get cpf() {
    return this.props.cpf
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

  static create(props: DeliveryManProps, id?: UniqueEntityID) {
   return new Deliveryman(props, id)
  }
}
