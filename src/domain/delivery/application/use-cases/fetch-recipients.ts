import { Either, right } from '@/core/either'
import { RecipientRepository } from '../repositories/recipient-repository'
import { Recipient } from '../../enterprise/entities/recipient'
import { Injectable } from '@nestjs/common'

interface FetchRecipientsUseCaseRequest {
  page: number
}

type FetchRecipientsUseCaseResponse = Either<
  null,
  {
    recipients: Recipient[]
  }
>

@Injectable()
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
