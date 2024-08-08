import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient'

import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
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
      throw new BadRequestException()
    }
  }
}
