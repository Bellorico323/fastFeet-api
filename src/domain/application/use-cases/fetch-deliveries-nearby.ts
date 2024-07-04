import { Either, right } from '@/core/either'
import { Delivery } from '@/domain/enterprise/entities/delivery'
import { DeliveryRepository } from '../repositories/delivery-repository'

interface FetchDeliveriesNearbyUseCaseRequest {
  latitude: number
  longitude: number
}

type FetchDeliveriesNearbyUseCaseResponse = Either<
  null,
  {
    deliveries: Delivery[]
  }
>

export class FetchDeliveriesNearbyUseCase {
  constructor(private deliverieRepository: DeliveryRepository) {}

  async execute({
    latitude,
    longitude,
  }: FetchDeliveriesNearbyUseCaseRequest): Promise<FetchDeliveriesNearbyUseCaseResponse> {
    const deliveries = await this.deliverieRepository.findManyNearByDeliveryman(
      { latitude, longitude },
    )

    return right({
      deliveries,
    })
  }
}
