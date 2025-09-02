<template>
  <div
    class="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
  >
    <div class="hidden md:flex md:items-center md:justify-between md:p-6">
      <div class="flex items-center space-x-4">
        <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img
            v-if="purchase.image"
            :src="headphone"
            :alt="purchase.title"
            class="w-full h-full object-cover"
            loading="lazy"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <i class="pi pi-headphones text-green-600 text-3xl"></i>
          </div>
        </div>

        <div class="flex-1">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">
            {{ purchase.title }}
          </h3>
          <div class="space-y-1 text-sm text-gray-600">
            <p>
              <span class="font-medium">{{ $t('purchase.purchase_value') }}</span>
              {{ formatCurrency(purchase.amount) }}
            </p>
            <p>
              <span class="font-medium">{{ $t('purchase.purchase_date') }}</span>
              {{ formatDate(purchase.purchaseDate) }}
            </p>
            <p>
              <span class="font-medium">{{ $t('purchase.refund_deadline') }}</span>
              {{ formatDate(purchase.refundDeadline) }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-shrink-0 ml-6">
        <PurchaseActionButton
          :status="purchase.refundStatus"
          :loading="isProcessing"
          @click="handleRefundRequest"
        />
      </div>
    </div>

    <div class="md:hidden">
      <div class="w-full h-48 bg-gray-100 overflow-hidden">
        <img
          v-if="purchase.image"
          :src="headphone"
          :alt="purchase.title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <i class="pi pi-headphones text-green-600 text-6xl"></i>
        </div>
      </div>

      <div class="p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">
          {{ purchase.title }}
        </h3>

        <div class="space-y-2 text-sm text-gray-600 mb-4">
          <p>
            <span class="font-medium">{{ $t('purchase.purchase_value') }}</span>
            {{ formatCurrency(purchase.amount) }}
          </p>
          <p>
            <span class="font-medium">{{ $t('purchase.purchase_date') }}</span>
            {{ formatDate(purchase.purchaseDate) }}
          </p>
          <p>
            <span class="font-medium">{{ $t('purchase.refund_deadline') }}</span>
            {{ formatDate(purchase.refundDeadline) }}
          </p>
        </div>

        <PurchaseActionButton
          :status="purchase.refundStatus"
          :loading="isProcessing"
          :full-width="true"
          @click="handleRefundRequest"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headphone from '@/assets/headphone.png'
import PurchaseActionButton from './PurchaseActionButton.vue'

interface Purchase {
  id: string
  title: string
  amount: number
  purchaseDate: string
  refundDeadline: string
  image: string
  refundStatus: 'available' | 'requested' | 'expired' | 'refunded'
}

const props = defineProps<{
  purchase: Purchase
}>()

const emit = defineEmits<{
  refundRequested: [purchase: Purchase]
}>()

const isProcessing = ref(false)

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-PT')
}

const handleRefundRequest = () => {
  if (props.purchase.refundStatus === 'available') {
    emit('refundRequested', props.purchase)
  }
}

defineOptions({
  name: 'PurchaseCardRoot',
})
</script>

<style scoped>
.transition-shadow {
  transition: box-shadow 0.2s ease-in-out;
}

.object-cover {
  object-fit: cover;
}

@media (max-width: 767px) {
  .space-y-2 > * + * {
    margin-top: 0.5rem;
  }
}
</style>
