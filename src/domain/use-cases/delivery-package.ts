import { Delivery } from "../entities/delivery"

interface DeliverPackageUseCaseRequest {
  deliverymanId: string
  packageId: string
  title: string
}

export class DeliveryPackageUseCase {
  execute({ deliverymanId, packageId, title }: DeliverPackageUseCaseRequest) {
    const delivery = new Delivery(title)

    return delivery
  }
}
