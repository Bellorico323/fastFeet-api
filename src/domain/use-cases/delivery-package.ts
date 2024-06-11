interface DeliverPackageUseCaseRequest {
  deliverymanId: string
  packageId: string
}

export class DeliveryPackageUseCase {
  execute({ deliverymanId, packageId }: DeliverPackageUseCaseRequest) {
    
  }
}

new DeliveryPackageUseCase().execute({
  deliverymanId: '1',
  packageId: '1',
})