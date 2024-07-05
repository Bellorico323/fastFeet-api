type DeliveryStatusTypes = 'Awaiting' | 'Withdrawn' | 'Delivered' | 'Returned'

export class DeliveryStatus {
  private status: DeliveryStatusTypes

  private constructor() {
    this.status = 'Awaiting'
  }

  toString() {
    return this.status.toString()
  }

  toWithdrawn() {
    return (this.status = 'Withdrawn')
  }

  toDelivered() {
    return (this.status = 'Delivered')
  }

  toReturned() {
    return (this.status = 'Returned')
  }

  static create() {
    return new DeliveryStatus()
  }
}
