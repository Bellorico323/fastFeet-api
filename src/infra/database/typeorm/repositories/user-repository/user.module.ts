import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database.module'
import { userProviders } from './user.providers'
import { UserService } from '.'
import { CreateAccountController } from '@/infra/controllers/create-account.controller'
import { AuthenticateController } from '@/infra/controllers/authenticate.controller'

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  controllers: [CreateAccountController, AuthenticateController],
})
export class UserModule {}
