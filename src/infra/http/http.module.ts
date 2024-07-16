import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateRecipientController } from './controllers/create-recipient.controller'
import { PrismaService } from '../database/prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateRecipientController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
