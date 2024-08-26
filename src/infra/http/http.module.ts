import { Module } from '@nestjs/common'
import { AuthenticateAdminController } from './controllers/authenticate-admin.controller'
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
import { GetRecipientByIdUseCase } from '@/domain/delivery/application/use-cases/get-recipient-by-id'
import { GetRecipientByIdController } from './controllers/get-recipient-by-id.controller'
import { DeleteRecipientUseCase } from '@/domain/delivery/application/use-cases/delete-recipient'
import { DeleteRecipientController } from './controllers/delete-recipient.controller'
import { RegisterDeliverymanController } from './controllers/register-deliveryman.controller'
import { RegisterDeliverymanUseCase } from '@/domain/delivery/application/use-cases/register-deliveryman'
import { AuthenticateDeliverymanController } from './controllers/authenticate-deliveryman.controller'
import { AuthenticateDeliverymanUseCase } from '@/domain/delivery/application/use-cases/authenticate-deliveryman'
import { ChangeDeliverymanPasswordController } from './controllers/change-deliveryman-password.controller'
import { ChangePasswordFromDeliverymanDeliverymanUseCase } from '@/domain/delivery/application/use-cases/change-password-from-deliveryman'
import { EditDeliverymanController } from './controllers/edit-deliveryman.controller'
import { EditDeliverymanUseCase } from '@/domain/delivery/application/use-cases/edit-deliveryman'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    CreateAccountController,
    AuthenticateAdminController,
    CreateRecipientController,
    EditRecipientController,
    FetchRecipientsController,
    GetRecipientByIdController,
    DeleteRecipientController,
    RegisterDeliverymanController,
    AuthenticateDeliverymanController,
    ChangeDeliverymanPasswordController,
    EditDeliverymanController,
  ],
  providers: [
    CreateRecipientUseCase,
    EditDeliverymanUseCase,
    DeleteRecipientUseCase,
    AuthenticateAdminUseCase,
    AuthenticateDeliverymanUseCase,
    ChangePasswordFromDeliverymanDeliverymanUseCase,
    RegisterAdminUseCase,
    EditRecipientsUseCase,
    GetRecipientByIdUseCase,
    FetchRecipientsUseCase,
    RegisterDeliverymanUseCase,
  ],
})
export class HttpModule {}
