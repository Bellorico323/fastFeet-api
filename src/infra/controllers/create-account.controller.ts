import {
  Body,
  ConflictException,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { UserService } from '../database/typeorm/repositories/user-repository'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('/accounts')
export class CreateAccountController {
  constructor(private userService: UserService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    const { name, email, password } = body

    const userWithSameEmail = await this.userService.findByEmail(email)

    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists',
      )
    }

    const hashedPassword = await hash(password, 8)

    await this.userService.create({ name, email, password: hashedPassword })
  }
}
