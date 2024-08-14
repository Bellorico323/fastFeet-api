import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient'

import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
} from '@nestjs/common'

@Controller('/recipients/:id')
export class DeleteRecipientController {
  constructor(private deleteRecipient: DeleteRecipientUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id') recipientId: string) {
    const result = await this.deleteRecipient.execute({
      id: recipientId,
    })

    if (result.isLeft()) {
      const error = result.value
      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
