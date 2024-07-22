import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateRecipientController } from './controllers/create-recipient.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateRecipientController,
  ],
  providers: [CreateRecipientUseCase],
})
export class HttpModule {}
