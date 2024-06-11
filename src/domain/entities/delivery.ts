import { randomUUID } from "node:crypto"

export class Delivery {
  public title: string
  public id: string

  constructor(title: string, id: string) {
    this.title = title
    this.id = id ?? randomUUID()
  }
}