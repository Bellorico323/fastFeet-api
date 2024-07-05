import { DeliverymanRepository } from '@/domain/delivery/application/repositories/deliveryman-repository'
import { Deliveryman } from '@/domain/delivery/enterprise/entities/deliveryman'

export class InMemoryDeliverymansRepository implements DeliverymanRepository {
  public items: Deliveryman[] = []

  async findByCpf(cpf: string): Promise<Deliveryman | null> {
    const deliveryman = this.items.find(
      (deliveryman) => deliveryman.cpf === cpf,
    )

    if (!deliveryman) {
      return null
    }

    return deliveryman
  }

  async register(deliveryman: Deliveryman): Promise<void> {
    this.items.push(deliveryman)
  }

  async save(deliveryman: Deliveryman): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === deliveryman.id)

    this.items[itemIndex] = deliveryman
  }

  async remove(deliveryman: Deliveryman): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === deliveryman.id)

    this.items.splice(itemIndex, 1)
  }
}
