<template>
  <Button :disabled="isDisabled" :loading="loading" :class="buttonClasses" @click="handleClick">
    {{ buttonText }}
  </Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'

const props = defineProps<{
  status: 'available' | 'requested' | 'expired' | 'refunded'
  loading?: boolean
  fullWidth?: boolean
}>()

const emit = defineEmits<{
  click: []
}>()

const { t } = useI18n()

const isDisabled = computed(() => {
  return props.status !== 'available' || props.loading
})

const buttonText = computed(() => {
  switch (props.status) {
    case 'available':
      return t('purchase.request_refund_button')
    case 'requested':
      return t('purchase.refund_button_requested')
    case 'expired':
      return t('purchase.expired_button')
    case 'refunded':
      return t('purchase.refund_button_refunded')
    default:
      return t('purchase.request_refund_button')
  }
})

const buttonClasses = computed(() => {
  const baseClasses = [
    'font-medium',
    'px-6',
    'py-2',
    'rounded-md',
    'transition-colors',
    'border-none',
  ]

  if (props.fullWidth) {
    baseClasses.push('w-full')
  }

  switch (props.status) {
    case 'available':
      baseClasses.push('bg-zinc-500', 'hover:bg-zinc-600', 'text-white', 'cursor-pointer')
      break
    case 'requested':
      baseClasses.push('bg-zinc-900', 'text-white', 'cursor-not-allowed')
      break
    case 'expired':
      baseClasses.push('bg-red-500', 'text-white', 'cursor-not-allowed')
      break
    case 'refunded':
      baseClasses.push('bg-green-500', 'text-white', 'cursor-not-allowed')
      break
  }

  return baseClasses.join(' ')
})

const handleClick = () => {
  if (!isDisabled.value) {
    emit('click')
  }
}

defineOptions({
  name: 'PurchaseActionButton',
})
</script>
