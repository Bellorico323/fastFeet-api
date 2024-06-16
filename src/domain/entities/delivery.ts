import { randomUUID } from "node:crypto"

export class Delivery {
  public id: string
  public title: string
  public recipientId: string 
  public deliverymanId: string
  public status: string
  public dateOfWithdraw: Date
  public deliveryDate: Date

  constructor(recipientId: string, deliverymanId: string ,title: string, id?: string) {
    this.id = id ?? randomUUID()
    this.title = title
    this.deliverymanId = deliverymanId
    this.recipientId = recipientId
    this.status = 'awaiting'
    this.dateOfWithdraw = new Date()
    this.deliveryDate = new Date()
  }
}