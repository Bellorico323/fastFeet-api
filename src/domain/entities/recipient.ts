import { Entity } from "@/core/entities/entity"

export interface RecipientProps {
  name: string 
  latitude: number
  longitude: number
}

export class Recipient extends Entity<RecipientProps> {
  get name() {
    return this.props.name
  }

  get latitude() {
    return this.props.latitude
  }

  get longitude() {
    return this.props.longitude
  }

}