import type { Purchase } from "@/core/purchase"

export async function getPurchases(): Promise<Purchase[]> {
  // TODO: trocar por chamada real de API

  await new Promise(r => setTimeout(r, 300))

  return [
    { id: '1', title: 'Wireless Noise-Cancelling Headphones', amount: 324, purchaseDate: '2025-05-22', refundDeadline: '2025-05-29', image: '/api/placeholder/80/80', refundStatus: 'available' },
    { id: '2', title: 'Wireless Noise-Cancelling Headphones', amount: 324, purchaseDate: '2025-05-22', refundDeadline: '2025-05-29', image: '/api/placeholder/80/80', refundStatus: 'available' },
    { id: '3', title: 'Wireless Noise-Cancelling Headphones', amount: 324, purchaseDate: '2025-05-22', refundDeadline: '2025-05-29', image: '/api/placeholder/80/80', refundStatus: 'requested' },
    { id: '4', title: 'Wireless Noise-Cancelling Headphones', amount: 324, purchaseDate: '2025-05-22', refundDeadline: '2025-05-29', image: '/api/placeholder/80/80', refundStatus: 'refunded' },
    { id: '5', title: 'Wireless Noise-Cancelling Headphones', amount: 324, purchaseDate: '2025-05-22', refundDeadline: '2025-05-29', image: '/api/placeholder/80/80', refundStatus: 'expired' },
  ]
}

export async function getPurchaseById(id: string): Promise<Purchase | null> {
  const purchases = await getPurchases()

  return purchases.find(purchase => purchase.id === id) ?? null
}
