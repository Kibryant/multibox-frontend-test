<template>
  <Button
    type="button"
    :disabled="isDisabled"
    :loading="loading"
    :aria-disabled="isDisabled"
    :aria-busy="loading || undefined"
    :class="[
      'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      fullWidth ? 'w-full' : 'w-auto',
      sizeClasses[size],
      uiByStatus[status].base,
      loading ? 'opacity-70 cursor-not-allowed' : uiByStatus[status].hover,
    ]"
    @click="onClick"
  >
    <i v-if="status === 'refunded'" class="pi pi-check text-emerald-700 mr-2"></i>

    <span v-if="!loading">{{ buttonText }}</span>

    <span v-else class="inline-flex items-center gap-2">
      <i class="pi pi-spinner animate-spin text-[14px]" />
      <span>{{ t('common.loading') || 'Carregando…' }}</span>
    </span>
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'

type Status = 'available' | 'requested' | 'expired' | 'refunded'
type Size = 'xs' | 'sm' | 'md'

const props = withDefaults(
  defineProps<{
    status: Status
    loading?: boolean
    fullWidth?: boolean
    size?: Size
  }>(),
  {
    loading: false,
    fullWidth: false,
    size: 'sm',
  },
)

const emit = defineEmits<{ (e: 'click'): void }>()
const { t } = useI18n()

const sizeClasses: Record<Size, string> = {
  xs: 'h-8 px-3 text-[13px]',
  sm: 'h-9 px-4 text-sm',
  md: 'h-10 px-5 text-base',
}

const uiByStatus: Record<Status, { base: string; hover: string; key: string }> = {
  available: {
    key: 'purchase.request_refund_button',
    base: 'bg-neutral-900 text-white shadow-sm focus:ring-neutral-700',
    hover: 'hover:bg-neutral-800',
  },
  requested: {
    key: 'purchase.refund_button_requested',
    base: 'bg-neutral-200 text-neutral-700 focus:ring-neutral-300 cursor-not-allowed',
    hover: '',
  },
  expired: {
    key: 'purchase.expired_button',
    base: 'bg-red-100 text-red-700 focus:ring-red-200 cursor-not-allowed',
    hover: '',
  },
  refunded: {
    key: 'purchase.refund_button_refunded',
    base: 'bg-emerald-100 text-emerald-700 focus:ring-emerald-200 cursor-not-allowed',
    hover: '',
  },
}

const isDisabled = computed(() => props.loading || props.status !== 'available')
const buttonText = computed(() => t(uiByStatus[props.status].key))

function onClick() {
  if (!isDisabled.value) emit('click')
}

defineOptions({ name: 'PurchaseActionButton' })
</script>
