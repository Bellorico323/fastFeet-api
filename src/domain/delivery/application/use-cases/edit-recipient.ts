import { Either, left, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { Recipient } from '../../enterprise/entities/recipient'

interface EditRecipientsUseCaseRequest {
  id: string
  name: string
  latitude: number
  longitude: number
}

type EditRecipientsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recipient: Recipient
  }
>

export class EditRecipientsUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    id,
    name,
    latitude,
    longitude,
  }: EditRecipientsUseCaseRequest): Promise<EditRecipientsUseCaseResponse> {
    const recipient = await this.recipientRepository.findById(id)

    if (!recipient) {
      return left(new ResourceNotFoundError())
    }

    recipient.name = name
    recipient.latitude = latitude
    recipient.longitude = longitude

    await this.recipientRepository.save(recipient)

    return right({
      recipient,
    })
  }
}
