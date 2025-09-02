<template>
  <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-8 max-w-3xl">
    <div class="flex items-start md:items-center md:justify-center">
      <i class="pi pi-info-circle text-blue-600 mt-0.5 mr-3" />
      <p class="text-blue-800 text-sm">
        {{ $t('purchase.alert') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ live?: boolean }>(), { live: false })
</script>
