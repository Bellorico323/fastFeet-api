import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common'
import { PrismaService } from '../database/prisma/prisma.service'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { z } from 'zod'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'

const createRecipientBodySchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type CreateRecipientBodySchema = z.infer<typeof createRecipientBodySchema>

@Controller('/recipient')
@UseGuards(JwtAuthGuard)
export class CreateRecipientController {
  constructor(private prisma: PrismaService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createRecipientBodySchema))
  async handle(@Body() body: CreateRecipientBodySchema) {
    console.log(body)
  }
}
