import { Either, left, right } from '@/core/either'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'

interface EditDeliverymanUseCaseRequest {
  name: string
  cpf: string
  latitude: number
  longitude: number
}

type EditDeliverymanUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    deliveryman: Deliveryman
  }
>

export class EditDeliverymanUseCase {
  constructor(private deliverymanRepository: DeliverymanRepository) {}

  async execute({
    name,
    cpf,
    latitude,
    longitude,
  }: EditDeliverymanUseCaseRequest): Promise<EditDeliverymanUseCaseResponse> {
    const deliveryman = await this.deliverymanRepository.findByCpf(cpf)

    if (!deliveryman) {
      return left(new ResourceNotFoundError())
    }

    deliveryman.name = name
    deliveryman.latitude = latitude
    deliveryman.longitude = longitude

    this.deliverymanRepository.save(deliveryman)

    return right({
      deliveryman,
    })
  }
}
