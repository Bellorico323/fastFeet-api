import { PaginationParams } from '@/core/repositories/pagination-params'
import { Delivery } from '@/domain/enterprise/entities/delivery'

export interface DeliveryRepository {
  findById(id: string): Promise<Delivery | null>
  findManyByDeliverymanId(
    deliverymanId: string,
    params: PaginationParams,
  ): Promise<Delivery[]>
  create(delivery: Delivery): Promise<void>
  save(delivery: Delivery): Promise<void>
  delete(delivery: Delivery): Promise<void>
}
