import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database.module'

import { CreateAccountController } from '@/infra/controllers/create-account.controller'
import { AuthenticateController } from '@/infra/controllers/authenticate.controller'
import { deliverymanProviders } from './deliveryman.providers'
import { DeliverymanService } from '.'

@Module({
  imports: [DatabaseModule],
  providers: [...deliverymanProviders, DeliverymanService],
  controllers: [CreateAccountController, AuthenticateController],
})
export class UserModule {}
