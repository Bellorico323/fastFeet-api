import { expect, test } from 'vitest'
import { DeliveryPackageUseCase } from './delivery-package'

test('create a delivery', ( ) => {
  const deliveryPackage = new DeliveryPackageUseCase()

  const delivery = deliveryPackage.execute({ deliverymanId: '1', packageId: '1', title: 'Package 1' })

  expect(delivery.title).toEqual('Package 1')
})