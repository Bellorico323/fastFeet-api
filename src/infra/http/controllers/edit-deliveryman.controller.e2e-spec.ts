import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AdminFactory } from 'test/factories/make-admin'
import request from 'supertest'
import { DeliverymanFactory } from 'test/factories/make-deliveryman'

describe('Edit deliveryman (e2e)', () => {
  let app: INestApplication
  let prisma: PrismaService
  let jwt: JwtService
  let adminFactory: AdminFactory
  let deliverymanFactory: DeliverymanFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [AdminFactory, DeliverymanFactory],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)
    adminFactory = moduleRef.get(AdminFactory)
    deliverymanFactory = moduleRef.get(DeliverymanFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[PUT] /deliverymans/:cpf', async () => {
    const admin = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: admin.id.toString(), role: 'ADMIN' })

    const deliveryman = await deliverymanFactory.makePrismaDeliveryman()

    const deliverymanCPF = deliveryman.cpf

    const response = await request(app.getHttpServer())
      .put(`/deliverymans/${deliverymanCPF}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'deliveryman-test',
        latitude: 12345,
        longitude: 12345,
      })

    expect(response.statusCode).toBe(204)

    const deliverymanOnDatabase = await prisma.deliveryman.findFirst({
      where: {
        name: 'deliveryman-test',
        latitude: 12345,
        longitude: 12345,
      },
    })

    expect(deliverymanOnDatabase).toBeTruthy()
  })
})
