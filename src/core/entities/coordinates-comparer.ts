interface Coordinates {
  longitude: number
  latitude: number
}

export class CoordinatesComparer {
  private firstCoordinates: Coordinates
  private secondCoordinates: Coordinates

  protected constructor(
    firstCoordinates: Coordinates,
    secondCoordinates: Coordinates,
  ) {
    this.firstCoordinates = firstCoordinates
    this.secondCoordinates = secondCoordinates
  }

  static getDistanceBetweenTwoCoordinates(
    firstCoordinates: Coordinates,
    secondCoordinates: Coordinates,
  ) {
    const comparer = new CoordinatesComparer(
      firstCoordinates,
      secondCoordinates,
    )

    if (
      comparer.firstCoordinates.latitude ===
        comparer.secondCoordinates.latitude &&
      comparer.firstCoordinates.longitude ===
        comparer.secondCoordinates.longitude
    ) {
      return 0
    }

    const fromRadian = (Math.PI * comparer.firstCoordinates.latitude) / 180
    const toRadian = (Math.PI * comparer.secondCoordinates.latitude) / 180

    const theta =
      comparer.firstCoordinates.longitude - comparer.secondCoordinates.longitude
    const radTheta = (Math.PI * theta) / 180

    let dist =
      Math.sin(fromRadian) * Math.sin(toRadian) +
      Math.cos(fromRadian) * Math.cos(toRadian) * Math.cos(radTheta)

    if (dist > 1) {
      dist = 1
    }

    dist = Math.acos(dist)
    dist = (dist * 180) / Math.PI
    dist = dist * 60 * 1.1515
    dist = dist * 1.609344

    return dist
  }
}
