import { DeliveryStatus } from './delivery-status'

test('it should create a new status with value equal to awaiting', () => {
  const status = DeliveryStatus.create()

  expect(status.toString()).toEqual('awaiting')
})

test('it should be able to change status to withdrawn', () => {
  let status = DeliveryStatus.create()

  status = DeliveryStatus.toWithdrawn()

  expect(status.toString()).toEqual('withdrawn')
})
