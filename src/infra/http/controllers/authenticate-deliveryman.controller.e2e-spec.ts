import { INestApplication } from '@nestjs/common'
import { AppModule } from '../../app.module'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { PrismaService } from '../../database/prisma/prisma.service'
import { hash } from 'bcryptjs'

describe('Authenticate Deliveryman (E2E)', () => {
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

  test('[POST] /sessions/deliveryman', async () => {
    await prisma.deliveryman.create({
      data: {
        name: 'John Doe',
        cpf: '111.111.111-11',
        password: await hash('123456', 8),
        latitude: 999999,
        longitude: 999999,
      },
    })

    const response = await request(app.getHttpServer())
      .post('/sessions/deliveryman')
      .send({
        cpf: '111.111.111-11',
        password: '123456',
      })

    expect(response.statusCode).toBe(201)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
