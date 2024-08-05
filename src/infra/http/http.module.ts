import { Module } from '@nestjs/common'
import { AuthenticateController } from './controllers/authenticate.controller'
import { CreateAccountController } from './controllers/create-account.controller'
import { CreateRecipientController } from './controllers/create-recipient.controller'
import { DatabaseModule } from '../database/database.module'
import { CreateRecipientUseCase } from '@/domain/delivery/application/use-cases/create-recipient'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { AuthenticateAdminUseCase } from '@/domain/delivery/application/use-cases/authenticate-admin'
import { RegisterAdminUseCase } from '@/domain/delivery/application/use-cases/register-admin'
import { EditRecipientsUseCase } from '@/domain/delivery/application/use-cases/edit-recipient'
import { EditRecipientController } from './controllers/edit-recipient.controller'
import { FetchRecipientsController } from './controllers/fetch-recipients.controller'
import { FetchRecipientsUseCase } from '@/domain/delivery/application/use-cases/fetch-recipients'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateRecipientController,
    EditRecipientController,
    FetchRecipientsController,
  ],
  providers: [
    CreateRecipientUseCase,
    AuthenticateAdminUseCase,
    RegisterAdminUseCase,
    EditRecipientsUseCase,
    FetchRecipientsUseCase,
  ],
})
export class HttpModule {}
