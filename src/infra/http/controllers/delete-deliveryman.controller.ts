import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { RemoveDeliverymanProfileUseCase } from '@/domain/delivery/application/use-cases/remove-deliveryman-profile'
import { CurrentUser } from '@/infra/auth/curret-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt-strategy'
import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param,
  UnauthorizedException,
} from '@nestjs/common'

@Controller('/deliverymans/:cpf')
export class DeleteDeliverymanController {
  constructor(private removeDeliveryman: RemoveDeliverymanProfileUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('cpf') cpf: string, @CurrentUser() user: TokenPayload) {
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException(
        `User don't have permission to complete this action.`,
      )
    }

    const result = await this.removeDeliveryman.execute({ cpf })

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
