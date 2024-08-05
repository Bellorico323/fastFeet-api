import { AppModule } from '@/infra/app.module'
import { DatabaseModule } from '@/infra/database/database.module'
import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test } from '@nestjs/testing'
import { AdminFactory } from 'test/factories/make-admin'
import { RecipientFactory } from 'test/factories/make-recipient'
import request from 'supertest'

describe('Fetch recipients (E2E)', () => {
  let app: INestApplication
  let recipientFactory: RecipientFactory
  let jwt: JwtService
  let adminFactory: AdminFactory

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule, DatabaseModule],
      providers: [RecipientFactory, AdminFactory],
    }).compile()

    app = moduleRef.createNestApplication()

    recipientFactory = moduleRef.get(RecipientFactory)
    adminFactory = moduleRef.get(AdminFactory)
    jwt = moduleRef.get(JwtService)

    await app.init()
  })

  test('[GET] /recipients', async () => {
    const admin = await adminFactory.makePrismaAdmin()

    const accessToken = jwt.sign({ sub: admin.id.toString() })

    await Promise.all([
      recipientFactory.makePrismaRecipient({
        name: 'recipient-1',
        latitude: 9999,
        longitude: 9999,
      }),
      recipientFactory.makePrismaRecipient({
        name: 'recipient-2',
        latitude: 9999,
        longitude: 9999,
      }),
    ])

    const response = await request(app.getHttpServer())
      .get('/recipients?page=1')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      recipients: expect.arrayContaining([
        expect.objectContaining({ name: 'recipient-1' }),
        expect.objectContaining({ name: 'recipient-2' }),
      ]),
    })
  })
})
