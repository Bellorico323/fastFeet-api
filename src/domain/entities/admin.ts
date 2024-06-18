import { Entity } from "@/core/entities/entity"

export interface AdminProps {
  name: string
  email: string
}

export class Admin extends Entity<AdminProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

}
