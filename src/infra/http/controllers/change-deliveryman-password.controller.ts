import { ChangePasswordFromDeliverymanDeliverymanUseCase } from '@/domain/delivery/application/use-cases/change-password-from-deliveryman'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { CurrentUser } from '@/infra/auth/curret-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt-strategy'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'

const changeDeliverymanPasswordBodySchema = z.object({
  cpf: z.string(),
  newPassword: z.string(),
})

type ChangeDeliverymanPasswordBodySchema = z.infer<
  typeof changeDeliverymanPasswordBodySchema
>

const bodyValidationPipe = new ZodValidationPipe(
  changeDeliverymanPasswordBodySchema,
)

@Controller('/password/change')
export class ChangeDeliverymanPasswordController {
  constructor(
    private changeDeliverymanPassword: ChangePasswordFromDeliverymanDeliverymanUseCase,
  ) {}

  @Post()
  @HttpCode(200)
  async handle(
    @Body(bodyValidationPipe) body: ChangeDeliverymanPasswordBodySchema,
    @CurrentUser() user: TokenPayload,
  ) {
    const { role } = user

    if (role !== 'ADMIN') {
      throw new UnauthorizedException(
        `User don't have permission to complete this action.`,
      )
    }

    const { cpf, newPassword } = body

    const result = await this.changeDeliverymanPassword.execute({
      cpf,
      newPassword,
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
