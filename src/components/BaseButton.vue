<template>
  <Button
    v-bind="$attrs"
    :aria-disabled="isLoading || disabled"
    :disabled="isLoading || disabled"
    :class="[
      baseClass,
      variants[variant],
      sizes[size],
      full ? 'w-full' : 'w-auto',
      isLoading ? 'opacity-70 disabled:cursor-not-allowed' : '',
      customClass,
      disabled ? 'opacity-70 disabled:cursor-not-allowed' : '',
    ]"
  >
    <template v-if="isLoading">
      <i class="pi pi-spinner animate-spin mr-2" />
      {{ $t('refund.loading') }}
    </template>

    <slot v-else />
  </Button>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  full?: boolean
  customClass?: string
  isLoading?: boolean
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  full: false,
  customClass: '',
  isLoading: false,
  disabled: false,
})

const baseClass =
  'rounded-lg font-medium transition duration-200 inline-flex items-center justify-center focus:outline-none not-disabled:hover:cursor-pointer'

const variants: Record<string, string> = {
  primary: 'bg-primary-color-medium text-white',
  secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
  ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
}

const sizes: Record<string, string> = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
}
</script>
