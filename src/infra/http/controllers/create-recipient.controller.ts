import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient'

const createRecipientBodySchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createRecipientBodySchema)

@Controller('/recipients')
@UseGuards(JwtAuthGuard)
export class CreateRecipientController {
  constructor(private createRecipient: CreateRecipientUseCase) {}

  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateRecipientBodySchema) {
    const { name, latitude, longitude } = body

    await this.createRecipient.execute({
      name,
      latitude,
      longitude,
    })
  }
}
