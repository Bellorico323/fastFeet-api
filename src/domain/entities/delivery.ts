import { randomUUID } from "node:crypto"

export class Delivery {
  public id: string
  public packageId: string
  public recipientId: string 
  public deliverymanId: string
  public status: string

  constructor(recipientId: string, deliverymanId: string ,packageId: string, id?: string) {
    this.id = id ?? randomUUID()
    this.packageId = packageId
    this.deliverymanId = deliverymanId
    this.recipientId = recipientId
    this.status = 'awaiting'
  }
}