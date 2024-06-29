import { Recipient } from '@/domain/enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-repository'
import { Either, right } from '@/core/either'

interface RegisterRecipientUseCaseRequest {
  name: string
  latitude: number
  longitude: number
}

type RegisterRecipientUseCaseResponse = Either<null, { recipient: Recipient }>

export class RegisterRecipientUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    name,
    latitude,
    longitude,
  }: RegisterRecipientUseCaseRequest): Promise<RegisterRecipientUseCaseResponse> {
    const recipient = Recipient.create({ name, latitude, longitude })

    await this.recipientRepository.create(recipient)

    return right({
      recipient,
    })
  }
}
