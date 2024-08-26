import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Put,
  UnauthorizedException,
} from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error'
import { EditDeliverymanUseCase } from '@/domain/delivery/application/use-cases/edit-deliveryman'
import { CurrentUser } from '@/infra/auth/curret-user-decorator'
import { TokenPayload } from '@/infra/auth/jwt-strategy'

const editDeliverymanBodySchema = z.object({
  name: z.string(),
  latitude: z.number(),
  longitude: z.number(),
})

type EditDeliverymanBodySchema = z.infer<typeof editDeliverymanBodySchema>

const bodyValidationPipe = new ZodValidationPipe(editDeliverymanBodySchema)

@Controller('/deliverymans/:cpf')
export class EditDeliverymanController {
  constructor(private editDeliveryman: EditDeliverymanUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditDeliverymanBodySchema,
    @Param('cpf') cpf: string,
    @CurrentUser() user: TokenPayload,
  ) {
    if (user.role !== 'ADMIN') {
      throw new UnauthorizedException(
        `User don't have permission to complete this action.`,
      )
    }

    const { name, latitude, longitude } = body

    const result = await this.editDeliveryman.execute({
      name,
      cpf,
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
