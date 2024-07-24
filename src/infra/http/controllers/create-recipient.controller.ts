import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient'

const createRecipientBodySchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createRecipientBodySchema)

@Controller('/recipients')
export class CreateRecipientController {
  constructor(private createRecipient: CreateRecipientUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateRecipientBodySchema) {
    const { name, latitude, longitude } = body

    const result = await this.createRecipient.execute({
      name,
      latitude,
      longitude,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }
  }
}
