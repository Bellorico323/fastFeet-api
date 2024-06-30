import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface DeliverymanProps {
  name: string
  cpf: string
  password: string
  latitude: number
  longitude: number
}

export class Deliveryman extends Entity<DeliverymanProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get cpf() {
    return this.props.cpf
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  get latitude() {
    return this.props.latitude
  }

  set latitude(latitude: number) {
    this.props.latitude = latitude
  }

  get longitude() {
    return this.props.longitude
  }

  set longitude(longitude: number) {
    this.props.longitude = longitude
  }

  get password() {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  static create(
    props: Optional<DeliverymanProps, 'latitude' | 'longitude'>,
    id?: UniqueEntityID,
  ) {
    return new Deliveryman(
      {
        ...props,
        latitude: props.latitude ?? 9999999,
        longitude: props.longitude ?? 9999999,
      },
      id,
    )
  }
}
