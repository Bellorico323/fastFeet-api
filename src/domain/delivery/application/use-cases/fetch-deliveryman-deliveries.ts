import { Either, right } from '@/core/either'
import { DeliveryRepository } from '../repositories/delivery-repository'
import { Delivery } from '../../enterprise/entities/delivery'

interface FetchDeliverymanDeliveriesUseCaseRequest {
  deliverymanId: string
  page: number
}

type FetchDeliverymanDeliveriesUseCaseResponse = Either<
  null,
  {
    deliveries: Delivery[]
  }
>

export class FetchDeliverymanDeliveriesUseCase {
  constructor(private deliveryRepository: DeliveryRepository) {}

  async execute({
    deliverymanId,
    page,
  }: FetchDeliverymanDeliveriesUseCaseRequest): Promise<FetchDeliverymanDeliveriesUseCaseResponse> {
    const deliveries = await this.deliveryRepository.findManyByDeliverymanId(
      deliverymanId,
      { page },
    )

    return right({
      deliveries,
    })
  }
}
