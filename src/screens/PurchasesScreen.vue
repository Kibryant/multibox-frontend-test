<template>
  <div class="min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <button
          @click="goBack"
          class="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <i class="pi pi-arrow-left mr-2" style="font-size: 12px"></i>
          <span class="text-sm">
            {{ $t('purchase.back') }}
          </span>
        </button>
      </div>

      <div
        class="flex flex-col justify-baseline gap-3 md:flex-row md:items-center md:justify-between mb-8"
      >
        <h1 class="text-3xl font-bold text-text-color">
          {{ $t('refund.your_purchases') }}
        </h1>

        <div class="font-normal text-sm text-secundary-text-color">
          <span>{{ $t('purchase.logged') }} {{ ' ' }}</span>
          <span class="font-medium">{{ email }}</span>
          <span class="mx-2">•</span>
          <button @click="logout" class="text-text-color underline">
            {{ $t('purchase.not_you') }} Log out
          </button>
        </div>
      </div>

      <div class="w-full md:flex md:justify-center md:items-center">
        <div class="max-w-3xl w-full">
          <AlertBanner>
            {{ $t('purchase.alert') }}
          </AlertBanner>
        </div>
      </div>

      <div class="space-y-6">
        <div v-for="purchase in purchases" :key="purchase.id">
          <PurchaseCardRoot :purchase="purchase" @refundRequested="requestRefund" />
        </div>
      </div>

      <div v-if="purchases.length === 0" class="text-center py-12">
        <i class="pi pi-shopping-cart text-gray-400 text-6xl mb-4"></i>
        <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhuma compra encontrada</h3>
        <p class="text-gray-600">Você ainda não fez nenhuma compra.</p>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AlertBanner from '@/components/AlertBanner.vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import PurchaseCardRoot from '@/components/PurchaseCard/PurchaseCardRoot.vue'

const route = useRoute()
const router = useRouter()
const email = route.query.email

interface Purchase {
  id: string
  title: string
  amount: number
  purchaseDate: string
  refundDeadline: string
  image: string
  refundStatus: 'available' | 'requested' | 'expired' | 'refunded'
}

const emit = defineEmits<{
  goBack: []
  logout: []
  refundRequested: [purchase: Purchase]
}>()

const purchases = ref<Purchase[]>([])

const selectedPurchase = ref<Purchase | null>(null)

const goBack = () => {
  router.back()
  emit('goBack')
}

const logout = () => {
  goBack()
  emit('logout')
}

const requestRefund = (purchase: Purchase) => {
  selectedPurchase.value = purchase
  router.push({ name: 'PurchaseDetail', params: { id: purchase.id }, query: { email } })
}

const loadPurchases = () => {
  purchases.value = [
    {
      id: '1',
      title: 'Wireless Noise-Cancelling Headphones',
      amount: 324.0,
      purchaseDate: '2025-05-22',
      refundDeadline: '2025-05-29',
      image: '/api/placeholder/80/80',
      refundStatus: 'available',
    },
    {
      id: '2',
      title: 'Wireless Noise-Cancelling Headphones',
      amount: 324.0,
      purchaseDate: '2025-05-22',
      refundDeadline: '2025-05-29',
      image: '/api/placeholder/80/80',
      refundStatus: 'available',
    },
    {
      id: '3',
      title: 'Wireless Noise-Cancelling Headphones',
      amount: 324.0,
      purchaseDate: '2025-05-22',
      refundDeadline: '2025-05-29',
      image: '/api/placeholder/80/80',
      refundStatus: 'requested',
    },
    {
      id: '4',
      title: 'Wireless Noise-Cancelling Headphones',
      amount: 324.0,
      purchaseDate: '2025-05-22',
      refundDeadline: '2025-05-29',
      image: '/api/placeholder/80/80',
      refundStatus: 'refunded',
    },
    {
      id: '5',
      title: 'Wireless Noise-Cancelling Headphones',
      amount: 324.0,
      purchaseDate: '2025-05-22',
      refundDeadline: '2025-05-29',
      image: '/api/placeholder/80/80',
      refundStatus: 'expired',
    },
  ]
}

onMounted(() => {
  loadPurchases()
})

defineOptions({
  name: 'PurchasesList',
})
</script>

<style scoped>
.p-button {
  border-radius: 0.5rem;
  font-weight: 500;
  transition: all 0.2s ease-in-out;
  border: none;
}

.p-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.p-button:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.p-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>
