import { Deliveryman } from '../../enterprise/entities/deliveryman'

export interface DeliverymanRepository {
  findByCpf(cpf: string): Promise<Deliveryman | null>
  register(Deliveryman: Deliveryman): Promise<void>
  save(Deliveryman: Deliveryman): Promise<void>
  remove(Deliveryman: Deliveryman): Promise<void>
}
