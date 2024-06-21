import { DeliveryStatus } from './delivery-status'

test('it should create a new status with value equal to awaiting', () => {
  const status = DeliveryStatus.create()

  expect(status.toString()).toEqual('Awaiting')
})

test('it should be able to change status to withdrawn', () => {
  const status = DeliveryStatus.create()

  status.toWithdrawn()

  expect(status.toString()).toEqual('Withdrawn')
})
