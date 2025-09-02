<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <header class="bg-white px-6 py-4 border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
    <div class="flex flex-col gap-4 sm:flex-row sm:gap-0 items-center justify-between">
      <div class="w-44" />

      <div class="flex-1 flex items-center justify-center">
        <img src="@/assets/logo.png" alt="Logo" class="h-10 object-contain" />
      </div>

      <SelectLanguage
        v-model="selectedLanguage"
        :options="languages"
        placeholder="Selecione o idioma"
        :filterable="true"
        :clearable="true"
        @change="onChange"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import SelectLanguage from './SelectLanguage.vue'

interface Language {
  code: string
  name: string
  flag: string
}

const { locale } = useI18n()

const selectedLanguage = ref<string>('pt-BR')

const languages = ref<Language[]>([
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'pt-BR', name: 'Português', flag: '🇧🇷' },
])

function onChange(lang: string | null) {
  if (!lang) return
  locale.value = lang
  localStorage.setItem('preferred-language', lang)
}

onMounted(() => {
  const savedLanguage = localStorage.getItem('preferred-language')
  if (savedLanguage && languages.value.some((l) => l.code === savedLanguage)) {
    selectedLanguage.value = savedLanguage
    locale.value = savedLanguage
  } else {
    const browser = navigator.language
    if (browser.startsWith('de')) {
      selectedLanguage.value = 'de'
      locale.value = 'de'
    } else if (browser.startsWith('pt')) {
      selectedLanguage.value = 'pt-BR'
      locale.value = 'pt-BR'
    } else {
      selectedLanguage.value = 'en'
      locale.value = 'en'
    }
  }
})
</script>
