import { Either, right } from '@/core/either'
import { Recipient } from '@/domain/enterprise/entities/recipient'
import { RecipientRepository } from '../repositories/recipient-repository'

interface FetchRecipientsUseCaseRequest {
  page: number
}

type FetchRecipientsUseCaseResponse = Either<
  null,
  {
    recipients: Recipient[]
  }
>

export class FetchRecipientsUseCase {
  constructor(private recipientRepository: RecipientRepository) {}

  async execute({
    page,
  }: FetchRecipientsUseCaseRequest): Promise<FetchRecipientsUseCaseResponse> {
    const recipients = await this.recipientRepository.findMany({ page })

    return right({
      recipients,
    })
  }
}
