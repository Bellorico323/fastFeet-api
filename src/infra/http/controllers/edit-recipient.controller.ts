import { EditRecipientsUseCase } from '@/domain/delivery/application/use-cases/edit-recipient'

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const editRecipientBodySchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type EditRecipientBodySchema = z.infer<typeof editRecipientBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editRecipientBodySchema)

@Controller('/recipients/:id')
export class EditRecipientController {
  constructor(private editRecipient: EditRecipientsUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditRecipientBodySchema,
    @Param('id') recipientId: string,
  ) {
    const { name, latitude, longitude } = body

    const result = await this.editRecipient.execute({
      id: recipientId,
      name,
      latitude,
      longitude,
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
