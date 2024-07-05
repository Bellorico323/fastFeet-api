import { PaginationParams } from '@/core/repositories/pagination-params'
import { Delivery } from '../../enterprise/entities/delivery'

export interface FindManyNearByParams {
  latitude: number
  longitude: number
}

export interface DeliveryRepository {
  findById(id: string): Promise<Delivery | null>
  findManyByDeliverymanId(
    deliverymanId: string,
    params: PaginationParams,
  ): Promise<Delivery[]>
  findManyNearByDeliveryman(params: FindManyNearByParams): Promise<Delivery[]>
  create(delivery: Delivery): Promise<void>
  save(delivery: Delivery): Promise<void>
  delete(delivery: Delivery): Promise<void>
}
