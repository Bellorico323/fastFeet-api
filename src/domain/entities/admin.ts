import { randomUUID } from "node:crypto"

export class Admin {
  public id: string
  public name: string
  public email: string

  constructor(name: string, email: string, id?: string) {
    this.id = id ?? randomUUID()
    this.name = name
    this.email = email
  }
}
