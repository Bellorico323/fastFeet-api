import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { UserModule } from './database/typeorm/repositories/user-repository/user.module'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {}
}
