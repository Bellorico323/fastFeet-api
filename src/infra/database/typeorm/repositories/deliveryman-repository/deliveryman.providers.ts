import { DataSource } from 'typeorm'
import { Deliveryman } from '../../entity/deliveryman'

export const deliverymanProviders = [
  {
    provide: 'DELIVERYMAN_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Deliveryman),
    inject: ['DATA_SOURCE'],
  },
]
