import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository'
import { PrismaRecipientRepository } from './prisma/repositories/prisma-recipient-repository'
import { PrismaDeliveryAttachmentsRepository } from './prisma/repositories/prisma-delivery-attachment-repository'
import { PrismaDeliveryRepository } from './prisma/repositories/prisma-delivery-repository'
import { PrismaDeliverymanRepository } from './prisma/repositories/prisma-deliveryman-repository'
import { RecipientRepository } from '@/domain/delivery/application/repositories/recipient-repository'
import { AdminRepository } from '@/domain/delivery/application/repositories/admin-repository'

@Module({
  providers: [
    PrismaService,
    {
      provide: RecipientRepository,
      useClass: PrismaRecipientRepository,
    },
    {
      provide: AdminRepository,
      useClass: PrismaAdminRepository,
    },
    PrismaDeliveryAttachmentsRepository,
    PrismaDeliveryRepository,
    PrismaDeliverymanRepository,
  ],
  exports: [
    PrismaService,
    AdminRepository,
    RecipientRepository,
    PrismaDeliveryAttachmentsRepository,
    PrismaDeliveryRepository,
    PrismaDeliverymanRepository,
  ],
})
export class DatabaseModule {}
