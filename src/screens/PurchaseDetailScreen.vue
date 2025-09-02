<template>
  <Dialog
    v-model:visible="visible"
    modal
    :blockScroll="true"
    :closable="true"
    :draggable="false"
    :pt="{
      mask: 'fixed inset-0 bg-black/60 flex items-start md:items-center justify-center z-[1100] overflow-y-auto',
      root: 'mt-16 md:mt-0 mb-10 mx-4 w-[22rem] sm:w-[24rem] md:w-[28rem] lg:w-[32rem] rounded-2xl bg-white shadow-[0_10px_24px_rgba(0,0,0,0.15)] z-[1101]',
      header: 'px-5 md:px-6 pt-5 md:pt-6 flex items-center justify-between',
      title: 'text-[18px] md:text-[20px] font-bold text-gray-900',
      content: 'px-5 md:px-6 py-4 md:py-5 text-gray-700',
      footer: 'px-5 md:px-6 pb-5 md:pb-6 pt-3 md:pt-4 flex justify-center',
      closeButton:
        'w-9 h-9 inline-grid place-items-center rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-600',
    }"
  >
    <template #header>
      <div />
    </template>

    <div class="flex flex-col items-center gap-3 md:gap-4">
      <i class="pi pi-check-circle text-green-600 text-5xl md:text-6xl" />

      <span class="text-xl md:text-2xl font-bold text-gray-900">
        {{ $t('refund_dialog.title') }}
      </span>

      <p class="text-center text-[13px] md:text-sm text-gray-600 leading-relaxed max-w-sm">
        {{ $t('refund_dialog.description') }}
      </p>
    </div>

    <template #footer>
      <BaseButton
        custom-class="bg-transparent w-full md:w-[200px] flex flex-row items-center justify-center gap-2 border border-green-600 hover:bg-green-50"
        type="button"
        @click="visible = false"
      >
        <i class="pi pi-times" style="color: #171717; font-size: 14px" />

        <span class="text-sm font-medium text-text-color">{{ $t('refund_dialog.close') }}</span>
      </BaseButton>
    </template>
  </Dialog>

  <div class="min-h-screen">
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex items-center justify-between mb-8">
        <button
          @click="goBack"
          type="button"
          class="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <i class="pi pi-arrow-left mr-2" style="font-size: 12px"></i>

          <span class="text-sm">
            {{ $t('purchase.back') }}
          </span>
        </button>
      </div>

      <div
        class="flex flex-col justify-baseline gap-3 md:flex-row md:items-center md:justify-between mb-12"
      >
        <h1 class="text-3xl font-bold text-text-color">
          {{ $t('purchase_detail.title') }}
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

      <div class="w-full flex flex-col gap-8 md:items-center">
        <div class="flex flex-col gap-3">
          <h2 class="text-lg font-semibold text-text-color text-left">
            {{ $t('purchase_detail.details') }}
          </h2>

          <div class="border border-gray-300 rounded-lg p-6 w-full md:w-[600px] bg-white shadow-md">
            <div class="mb-6">
              <h3 class="text-md font-medium text-text-color mb-1">
                {{ $t('purchase_detail.name') }}
              </h3>

              <p class="text-sm text-secundary-text-color">
                {{ purchase.title }}
              </p>
            </div>

            <div class="mb-6">
              <h3 class="text-md font-medium text-text-color mb-1">
                {{ $t('purchase_detail.value') }}
              </h3>

              <p class="text-sm text-secundary-text-color">
                1x {{ formatCurrency(purchase.amount) }}
              </p>
            </div>

            <div class="mb-6">
              <h3 class="text-md font-medium text-text-color mb-1">
                {{ $t('purchase_detail.refund_deadline') }}
              </h3>

              <p class="text-sm text-secundary-text-color">
                {{ formatDate(purchase.refundDeadline) }}
              </p>
            </div>

            <div class="mb-6">
              <h3 class="text-md font-medium text-text-color mb-1">
                {{ $t('purchase_detail.payment_method') }}
              </h3>

              <p class="text-sm text-secundary-text-color">Mastercard **** 1234</p>
            </div>

            <div class="mb-6">
              <h3 class="text-md font-medium text-text-color mb-1">
                {{ $t('purchase_detail.support') }}
              </h3>

              <p class="text-sm text-secundary-text-color">suporte@multidrop.com</p>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <h2 class="text-lg font-semibold text-text-color text-left">
            {{ $t('purchase_detail.motivation') }}
          </h2>

          <div class="border border-gray-300 rounded-lg p-6 w-full md:w-[600px] bg-white shadow-md">
            <div class="mb-5">
              <h3 class="text-md font-medium text-text-color mb-1">
                {{ $t('purchase_detail.select_motive') }}
              </h3>

              <p class="text-sm text-secundary-text-color">
                {{ $t('purchase_detail.required') }} <span class="text-red-500 ml-1">*</span>
              </p>
            </div>

            <div class="space-y-3 mb-8">
              <div v-for="reason in refundReasons" :key="reason.id" class="flex items-center">
                <label class="flex items-center cursor-pointer select-none gap-2">
                  <input
                    type="radio"
                    name="reason"
                    class="peer sr-only"
                    v-model="selectedReason"
                    :value="reason.id"
                  />

                  <span
                    class="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center transition-colors peer-checked:border-green-600"
                  >
                    <span
                      class="w-2.5 h-2.5 rounded-full"
                      :style="{
                        backgroundColor:
                          selectedReason === reason.id
                            ? 'oklch(62.7% 0.194 149.214)'
                            : 'transparent',
                      }"
                    />
                  </span>

                  <span class="text-sm text-text-color">
                    {{ $t(reason.labelKey) }}
                  </span>
                </label>
              </div>
            </div>

            <div class="mb-5">
              <label class="block text-md font-medium text-text-color mb-1" for="additional-info">
                {{ $t('purchase_detail.more_information') }}
              </label>

              <textarea
                id="additional-info"
                rows="4"
                class="w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-primary-color-medium focus:border-primary-color-medium focus:outline-none p-3 text-sm text-text-color"
              />

              <p class="text-xs text-secundary-text-color mt-1">
                {{ $t('purchase_detail.optional') }}
              </p>
            </div>
          </div>
        </div>

        <BaseButton type="button" class="w-full md:w-[200px] justify-center" @click="openDialog">
          <span className="font-normal text-base">
            {{ $t('refund.request_refund') }}
          </span>
        </BaseButton>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import Dialog from 'primevue/dialog'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { useRoute, useRouter } from 'vue-router'

interface RefundReason {
  id: string
  labelKey: string
}

const router = useRouter()
const route = useRoute()
const email = route.query.email
const id = route.params.id
const selectedReason = ref<string | null>(null)
const visible = ref(false)

const openDialog = () => {
  visible.value = true
}

const purchases = [
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

const logout = () => {
  router.push({ name: 'Purchases', query: {} })
}

const goBack = () => {
  router.back()
}

const purchase = purchases.find((p) => p.id === id) || purchases[0]

const refundReasons = ref<RefundReason[]>([
  {
    id: 'access_issue',
    labelKey: 'refund_form.reasons.access_issue',
  },
  {
    id: 'need_money',
    labelKey: 'refund_form.reasons.need_money',
  },
  {
    id: 'files_not_opening',
    labelKey: 'refund_form.reasons.files_not_opening',
  },
  {
    id: 'quality_expectations',
    labelKey: 'refund_form.reasons.quality_expectations',
  },
  {
    id: 'incomplete_product',
    labelKey: 'refund_form.reasons.incomplete_product',
  },
  {
    id: 'duplicate_purchase',
    labelKey: 'refund_form.reasons.duplicate_purchase',
  },
])

defineOptions({
  name: 'PurchaseDetailScreen',
})
</script>
