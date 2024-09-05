import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from '../../database/prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { AdminFactory } from 'test/factories/make-admin'
import { DeliverymanFactory } from 'test/factories/make-deliveryman'
import { DatabaseModule } from '@/infra/database/database.module'
import { CryptographyModule } from '@/infra/cryptography/cryptography.module'
import { BcryptHasher } from '@/infra/cryptography/bcript-hasher'

describe('Change Deliveryman Password (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let adminFactory: AdminFactory
  let deliverymanFactory: DeliverymanFactory
  let bcriptHasher: BcryptHasher

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule, CryptographyModule],
      providers: [AdminFactory, DeliverymanFactory, BcryptHasher],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)
    jwt = moduleRef.get(JwtService)
    bcriptHasher = moduleRef.get(BcryptHasher)

    await app.init()
  })

  test('[POST] /password/change', async () => {
    const admin = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: admin.id.toString(), role: 'ADMIN' })

    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()

    const response = await request(app.getHttpServer())
      .post(`/password/change`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        cpf: deliveryman.cpf,
        newPassword: 'newPassword1',
      })

    expect(response.statusCode).toBe(200)

    const deliverymanOnDatabase = await prisma.deliveryman.findFirst({
      where: {
        cpf: deliveryman.cpf,
      },
    })

    if (!deliverymanOnDatabase) {
      return null
    }

    const deliverymanNewPasswordChanged = await bcriptHasher.compare(
      'newPassword1',
      deliverymanOnDatabase.password,
    )

    expect(deliverymanNewPasswordChanged).toBeTruthy()
  })
})
