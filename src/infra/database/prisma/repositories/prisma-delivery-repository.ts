import { PaginationParams } from '@/core/repositories/pagination-params'
import {
  DeliveryRepository,
  FindManyNearByParams,
} from '@/domain/delivery/application/repositories/delivery-repository'
import { Delivery } from '@/domain/delivery/enterprise/entities/delivery'
import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { PrismaDeliveryMapper } from '../mappers/prisma-delivery-mapper'

Injectable()
export class PrismaDeliveryRepository implements DeliveryRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Delivery | null> {
    const delivery = await this.prisma.delivery.findUnique({
      where: {
        id,
      },
    })

    if (!delivery) {
      return null
    }

    return PrismaDeliveryMapper.toDomain(delivery)
  }

  async findManyByDeliverymanId(
    deliverymanId: string,
    { page }: PaginationParams,
  ): Promise<Delivery[]> {
    const deliveries = await this.prisma.delivery.findMany({
      where: {
        deliverymanId,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return deliveries.map(PrismaDeliveryMapper.toDomain)
  }

  async findManyNearByDeliveryman(
    params: FindManyNearByParams,
  ): Promise<Delivery[]> {
    const deliveries = await this.prisma.$queryRaw<Delivery[]>`
    SELECT * FROM deliveries
    WHERE ( 6371 * acos( cos( radians(${params.latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.longitude}) ) + sin( radians(${params.latitude}) ) * sin( radians( latitude ) ) ) ) <= 10 
  `

    return deliveries
  }

  async create(delivery: Delivery): Promise<void> {
    const data = PrismaDeliveryMapper.toPrisma(delivery)

    await this.prisma.delivery.create({
      data,
    })
  }

  async save(delivery: Delivery): Promise<void> {
    const { id, ...data } = PrismaDeliveryMapper.toPrisma(delivery)

    await this.prisma.delivery.update({
      data,
      where: {
        id,
      },
    })
  }

  async delete(delivery: Delivery): Promise<void> {
    await this.prisma.delivery.delete({
      where: {
        id: delivery.id.toString(),
      },
    })
  }
}
