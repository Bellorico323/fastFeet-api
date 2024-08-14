import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from '../../database/prisma/prisma.service'

describe('Create deliveryman account (E2E)', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleRef.createNestApplication()
    prisma = moduleRef.get(PrismaService)

    await app.init()
  })

  test('[POST] /deliverymans/create-account', async () => {
    const response = await request(app.getHttpServer())
      .post('/deliverymans/create-account')
      .send({
        name: 'John Doe',
        cpf: '12312312312',
        password: '123456',
      })

    expect(response.statusCode).toBe(201)

    const userOnDatabase = await prisma.deliveryman.findUnique({
      where: {
        cpf: '12312312312',
      },
    })

    expect(userOnDatabase).toBeTruthy()
  })
})
