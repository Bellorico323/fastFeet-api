import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { Public } from '@/infra/auth/public'
import { RegisterDeliverymanUseCase } from '@/domain/delivery/application/use-cases/register-deliveryman'
import { DeliverymanAlreadyExistsError } from '@/domain/delivery/application/use-cases/errors/deliveryman-already-exists-error'

const registerDeliverymanBodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  password: z.string(),
})

type RegisterDeliverymanBodySchema = z.infer<
  typeof registerDeliverymanBodySchema
>

@Controller('/deliverymans/create-account')
@Public()
export class RegisterDeliverymanController {
  constructor(private registerDeliveryman: RegisterDeliverymanUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(registerDeliverymanBodySchema))
  async handle(@Body() body: RegisterDeliverymanBodySchema) {
    const { name, cpf, password } = body

    const result = await this.registerDeliveryman.execute({
      name,
      cpf,
      password,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case DeliverymanAlreadyExistsError:
          throw new ConflictException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }
  }
}
