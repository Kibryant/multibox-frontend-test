export type PurchaseStatus = 'available' | 'requested' | 'expired' | 'refunded'

export interface Purchase {
  id: string
  title: string
  amount: number
  purchaseDate: string
  refundDeadline: string
  image: string
  refundStatus: PurchaseStatus
}
