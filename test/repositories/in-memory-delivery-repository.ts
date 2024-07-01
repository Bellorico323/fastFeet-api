import { PaginationParams } from '@/core/repositories/pagination-params'
import { DeliveryRepository } from '@/domain/application/repositories/delivery-repository'
import { Delivery } from '@/domain/enterprise/entities/delivery'

export class InMemoryDeliveryRepository implements DeliveryRepository {
  public items: Delivery[] = []

  async findById(id: string): Promise<Delivery | null> {
    const delivery = this.items.find(
      (delivery) => delivery.id.toString() === id,
    )

    if (!delivery) {
      return null
    }

    return delivery
  }

  async findManyByDeliverymanId(
    deliverymanId: string,
    { page }: PaginationParams,
  ): Promise<Delivery[]> {
    const deliveries = this.items
      .filter((item) => item.deliverymanId.toString() === deliverymanId)
      .slice((page - 1) * 20, page * 20)

    return deliveries
  }

  async create(delivery: Delivery): Promise<void> {
    this.items.push(delivery)
  }

  async save(delivery: Delivery): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === delivery.id)

    this.items[itemIndex] = delivery
  }

  async delete(delivery: Delivery): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === delivery.id)

    this.items.splice(itemIndex, 1)
  }
}
