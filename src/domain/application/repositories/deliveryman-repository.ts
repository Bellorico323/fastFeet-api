import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'

export interface DeliverymanRepository {
  findByCpf(cpf: string): Promise<Deliveryman | null>
  register(Deliveryman: Deliveryman): Promise<void>
  save(Deliveryman: Deliveryman): Promise<void>
}
