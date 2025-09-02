<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

type Option = { code: string; name: string; flag?: string }

const props = defineProps<{
  modelValue: string | null
  options: Option[]
  placeholder?: string
  disabled?: boolean
  filterable?: boolean
  clearable?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string | null): void
  (e: 'change', v: string | null): void
}>()

const open = ref(false)
const rootEl = ref<HTMLElement | null>(null)
const buttonEl = ref<HTMLButtonElement | null>(null)
const listEl = ref<HTMLElement | null>(null)
const query = ref('')

const selected = computed(() => props.options.find((o) => o.code === props.modelValue) || null)

const filtered = computed(() => {
  if (!props.filterable || !query.value.trim()) return props.options
  const q = query.value.toLowerCase()
  return props.options.filter(
    (o) => o.name.toLowerCase().includes(q) || o.code.toLowerCase().includes(q),
  )
})

const activeIndex = ref(-1)
watch(open, async (val) => {
  if (val) {
    await nextTick()
    activeIndex.value = Math.max(
      0,
      filtered.value.findIndex((o) => o.code === props.modelValue),
    )
    if (props.filterable) query.value = ''
    listEl.value?.focus()
  }
})

function openMenu() {
  if (props.disabled) return
  open.value = true
}
function closeMenu(focusButton = true) {
  open.value = false
  if (focusButton) buttonEl.value?.focus()
}

function toggle() {
  if (props.disabled) return
  if (open.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

function selectAt(idx: number) {
  const opt = filtered.value[idx]
  if (!opt) return
  emit('update:modelValue', opt.code)
  emit('change', opt.code)
  closeMenu()
}

function onKeydownButton(e: KeyboardEvent) {
  if (props.disabled) return
  if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
    e.preventDefault()
    openMenu()
    if (e.key === 'ArrowUp') activeIndex.value = Math.max(filtered.value.length - 1, 0)
    else activeIndex.value = 0
  }
}

function onKeydownList(e: KeyboardEvent) {
  if (!open.value) return
  if (e.key === 'Escape') {
    e.preventDefault()
    closeMenu()
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % filtered.value.length
    scrollActiveIntoView()
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + filtered.value.length) % filtered.value.length
    scrollActiveIntoView()
  } else if (e.key === 'Enter') {
    e.preventDefault()
    selectAt(activeIndex.value)
  } else if (e.key === 'Tab') {
    closeMenu(false)
  }
}

function scrollActiveIntoView() {
  const list = listEl.value
  if (!list) return
  const el = list.querySelector<HTMLElement>(`[data-idx='${activeIndex.value}']`)
  el?.scrollIntoView({ block: 'nearest' })
}

function onDocClick(e: MouseEvent) {
  if (!open.value) return
  const t = e.target as Node
  if (rootEl.value && !rootEl.value.contains(t)) closeMenu(false)
}

onMounted(() => document.addEventListener('mousedown', onDocClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocClick))
</script>

<template>
  <div
    ref="rootEl"
    class="relative inline-block text-left"
    :class="{ 'opacity-60 pointer-events-none': disabled }"
  >
    <button
      ref="buttonEl"
      type="button"
      class="flex items-center justify-between gap-2 w-44 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 shadow-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
      :aria-expanded="open"
      aria-haspopup="listbox"
      @click="toggle"
      @keydown="onKeydownButton"
    >
      <span class="flex items-center gap-2 truncate">
        <span v-if="selected?.flag" class="text-base leading-none">{{ selected.flag }}</span>
        <span class="truncate">
          {{ selected ? selected.name : placeholder || 'Select…' }}
        </span>
      </span>

      <span class="ml-1 flex items-center gap-1">
        <i class="pi pi-chevron-down text-gray-500 text-xs" />
      </span>
    </button>

    <div
      v-show="open"
      class="absolute right-0 mt-2 w-44 origin-top-right rounded-lg border border-gray-200 bg-white shadow-xl z-50"
      role="listbox"
      tabindex="-1"
      ref="listEl"
      @keydown="onKeydownList"
    >
      <div class="max-h-64 overflow-auto py-1">
        <template v-if="filtered.length">
          <button
            v-for="(opt, idx) in filtered"
            :key="opt.code"
            type="button"
            :data-idx="idx"
            class="w-full text-left px-3 py-2 text-sm flex items-center gap-3 hover:bg-gray-100"
            :class="[
              idx === activeIndex ? 'bg-gray-100' : '',
              modelValue === opt.code ? 'font-medium' : '',
            ]"
            role="option"
            :aria-selected="modelValue === opt.code"
            @mouseenter="activeIndex = idx"
            @click="selectAt(idx)"
          >
            <span v-if="opt.flag" class="text-base">{{ opt.flag }}</span>
            <span class="truncate">{{ opt.name }}</span>
          </button>
        </template>

        <div v-else class="px-3 py-3 text-sm text-gray-500">Nenhum resultado</div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
