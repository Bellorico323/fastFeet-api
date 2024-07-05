import { UseCaseError } from '@/core/errors/use-case-error'

export class DeliveryWithoutAttachmentError
  extends Error
  implements UseCaseError
{
  constructor(identifier: string) {
    super(`delivery "${identifier}" must have at least one attachment`)
  }
}
