import { Either, left, right } from '@/core/either'
import { DeliverymanRepository } from '../repositories/deliveryman-repository'
import { Deliveryman } from '@/domain/enterprise/entities/deliveryman'
import { HashGenerator } from '../cryptography/hash-generator'
import { DeliverymanAlreadyExistsError } from './errors/deliveryman-already-exists-error'

interface RegisterDeliverymanUseCaseRequest {
  name: string
  cpf: string
  password: string
}

type RegisterDeliverymanUseCaseResponse = Either<
  DeliverymanAlreadyExistsError,
  {
    deliveryman: Deliveryman
  }
>

export class RegisterDeliverymanUseCase {
  constructor(
    private deliverymanRepository: DeliverymanRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    cpf,
    password,
  }: RegisterDeliverymanUseCaseRequest): Promise<RegisterDeliverymanUseCaseResponse> {
    const deliverymanWithSameCpf =
      await this.deliverymanRepository.findByCpf(cpf)

    if (deliverymanWithSameCpf) {
      return left(new DeliverymanAlreadyExistsError(cpf))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const deliveryman = Deliveryman.create({
      name,
      cpf,
      password: hashedPassword,
    })

    await this.deliverymanRepository.register(deliveryman)

    return right({
      deliveryman,
    })
  }
}
