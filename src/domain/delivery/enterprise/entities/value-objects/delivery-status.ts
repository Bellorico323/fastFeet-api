type DeliveryStatusTypes = 'awaiting' | 'withdrawn' | 'delivered' | 'returned'

export class DeliveryStatus {
  private status: DeliveryStatusTypes

  private constructor(status: DeliveryStatusTypes) {
    this.status = status
  }

  toString() {
    return this.status.toString()
  }

  static toWithdrawn() {
    return new DeliveryStatus('withdrawn')
  }

  static toDelivered() {
    return new DeliveryStatus('delivered')
  }

  static toReturned() {
    return new DeliveryStatus('returned')
  }

  static create() {
    return new DeliveryStatus('awaiting')
  }

  static toStatus(status: string) {
    if (
      status === 'awaiting' ||
      status === 'withdrawn' ||
      status === 'delivered' ||
      status === 'returned'
    ) {
      return new DeliveryStatus(status)
    } else {
      return DeliveryStatus.create()
    }
  }
}
