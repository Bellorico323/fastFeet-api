import { CoordinatesComparer } from './coordinates-comparer'

describe('coordinates comparer', () => {
  it('should be able to compare 2 coordinates', () => {
    const coodinatesDistance =
      CoordinatesComparer.getDistanceBetweenTwoCoordinates(
        { latitude: -23.668511, longitude: -46.5580583 },
        { latitude: -23.641539, longitude: -46.633877 },
      )

    expect(coodinatesDistance).toEqual(expect.any(Number))
  })
})
