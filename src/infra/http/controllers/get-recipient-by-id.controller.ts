import { GetRecipientByIdUseCase } from '@/domain/delivery/application/use-cases/get-recipient-by-id'
import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { RecipientPresenter } from '../presenters/recipient-presenter'

@Controller('/recipients/:id')
export class GetRecipientByIdController {
  constructor(private getRecipientById: GetRecipientByIdUseCase) {}

  @Get()
  async handle(@Param('id') id: string) {
    const result = await this.getRecipientById.execute({ id })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    return { recipient: RecipientPresenter.toHTTP(result.value.recipient) }
  }
}
