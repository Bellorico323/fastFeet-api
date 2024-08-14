import { Deliveryman } from '../../enterprise/entities/deliveryman'

export abstract class DeliverymanRepository {
  abstract findByCpf(cpf: string): Promise<Deliveryman | null>
  abstract register(Deliveryman: Deliveryman): Promise<void>
  abstract save(Deliveryman: Deliveryman): Promise<void>
  abstract remove(Deliveryman: Deliveryman): Promise<void>
}
