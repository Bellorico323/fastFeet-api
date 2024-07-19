import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  DeliveryRepository,
  FindManyNearByParams,
} from '@/domain/delivery/application/repositories/delivery-repository'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'
import { Injectable } from '@nestjs/common'

Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {
  findById(id: string): Promise<Delivery | null> {
    throw new Error('Method not implemented.')
  }

  findManyByDeliverymanId(
    deliverymanId: string,
    params: PaginationParams,
  ): Promise<Delivery[]> {
    throw new Error('Method not implemented.')
  }

  findManyNearByDeliveryman(params: FindManyNearByParams): Promise<Delivery[]> {
    throw new Error('Method not implemented.')
  }

  create(delivery: Delivery): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(delivery: Delivery): Promise<void> {
    throw new Error('Method not implemented.')
  }

  delete(delivery: Delivery): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
