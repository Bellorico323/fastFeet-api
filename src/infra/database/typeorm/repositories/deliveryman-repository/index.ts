import { Injectable, Inject } from '@nestjs/common'
import { Repository } from 'typeorm'
import { Deliveryman } from '../../entity/deliveryman'

@Injectable()
export class DeliverymanService {
  constructor(
    @Inject('DELIVERYMAN_REPOSITORY')
    private deliverymanRepository: Repository<Deliveryman>,
  ) {}
}
