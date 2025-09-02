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
        <div v-if="isLoading" class="flex justify-center my-12">
          <i class="pi pi-spin pi-spinner text-4xl text-gray-400"></i>
        </div>
        <div v-if="!isLoading && purchases.length > 0" class="space-y-6">
          <div v-for="purchase in purchases" :key="purchase.id">
            <PurchaseCardRoot :purchase="purchase" @refundRequested="requestRefund" />
          </div>
        </div>
      </div>

      <div v-if="!isLoading && purchases.length === 0" class="text-center py-12">
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
import type { Purchase } from '@/core/purchase'
import { getPurchases } from '@/services/purchases'

const route = useRoute()
const router = useRouter()
const email = route.query.email
const isLoading = ref(false)

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

const loadPurchases = async () => {
  isLoading.value = true

  const result = await getPurchases()

  result.sort((a, b) => new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime())

  purchases.value = result
  isLoading.value = false
}

onMounted(() => {
  loadPurchases()
})

defineOptions({
  name: 'PurchasesList',
})
</script>
