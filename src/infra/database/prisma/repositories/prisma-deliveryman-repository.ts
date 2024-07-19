import { DeliverymanRepository } from '@/domain/delivery/application/repositories/deliveryman-repository'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaDeliverymanRepository implements DeliverymanRepository {
  findByCpf(cpf: string): Promise<Deliveryman | null> {
    throw new Error('Method not implemented.')
  }

  register(Deliveryman: Deliveryman): Promise<void> {
    throw new Error('Method not implemented.')
  }

  save(Deliveryman: Deliveryman): Promise<void> {
    throw new Error('Method not implemented.')
  }

  remove(Deliveryman: Deliveryman): Promise<void> {
    throw new Error('Method not implemented.')
  }
}
