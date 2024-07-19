import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { PrismaAdminRepository } from './prisma/repositories/prisma-admin-repository'
import { PrismaRecipientRepository } from './prisma/repositories/prisma-recipient-repository'
import { PrismaDeliveryAttachmentsRepository } from './prisma/repositories/prisma-delivery-attachment-repository'
import { PrismaDeliveryRepository } from './prisma/repositories/prisma-delivery-repository'
import { PrismaDeliverymanRepository } from './prisma/repositories/prisma-deliveryman-repository'

@Module({
  providers: [
    PrismaService,
    PrismaAdminRepository,
    PrismaRecipientRepository,
    PrismaDeliveryAttachmentsRepository,
    PrismaDeliveryRepository,
    PrismaDeliverymanRepository,
  ],
  exports: [
    PrismaService,
    PrismaAdminRepository,
    PrismaRecipientRepository,
    PrismaDeliveryAttachmentsRepository,
    PrismaDeliveryRepository,
    PrismaDeliverymanRepository,
  ],
})
export class DatabaseModule {}
