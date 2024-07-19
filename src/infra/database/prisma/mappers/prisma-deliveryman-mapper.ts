import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'
import { Deliveryman as PrismaDeliveryman } from '@prisma/client'
import { Decimal } from '@prisma/client/runtime/library'

export class PrismaDeliverymanMapper {
  static toDomain(raw: PrismaDeliveryman): Deliveryman {
    return Deliveryman.create(
      {
        name: raw.name,
        cpf: raw.cpf,
        latitude: Number(raw.latitude),
        longitude: Number(raw.longitude),
        password: raw.password,
      },
      new UniqueEntityID(raw.id),
    )
  }

  static toPrisma(deliveryman: Deliveryman): PrismaDeliveryman {
    return {
      id: deliveryman.id.toString(),
      name: deliveryman.name,
      cpf: deliveryman.cpf,
      latitude: new Decimal(deliveryman.latitude),
      longitude: new Decimal(deliveryman.longitude),
      password: deliveryman.password,
    }
  }
}
