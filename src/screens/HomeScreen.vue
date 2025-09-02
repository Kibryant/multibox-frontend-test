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
      <span class="text-xl md:text-2xl font-bold text-gray-900">
        {{ $t('dialog.title') }}
      </span>

      <p class="text-center text-[13px] md:text-sm text-gray-600 leading-relaxed">
        {{ $t('dialog.description') }}
        <br />
        <span class="font-medium text-gray-800 break-all">{{ email }}</span>
      </p>

      <button
        class="mx-auto block text-xs md:text-sm text-gray-500 hover:text-gray-700"
        :disabled="countdown > 0"
        @click="handleResend"
      >
        <span v-if="countdown > 0"> {{ $t('dialog.resend_code') }} ({{ countdown }}s) </span>
        <span v-else>{{ $t('dialog.resend_code') }}</span>
      </button>

      <div class="flex items-center justify-center gap-2 md:gap-3 lg:gap-4">
        <input
          v-for="(d, i) in 6"
          :key="i"
          ref="otpRefs"
          type="text"
          inputmode="numeric"
          maxlength="1"
          class="w-10 h-12 sm:w-11 sm:h-[52px] md:w-12 md:h-14 rounded-lg border border-gray-300 text-center text-lg md:text-xl font-medium focus:outline-none focus:ring-2 focus:ring-primary-color-medium focus:border-primary-color-medium text-text-color"
          v-model="otp[i]"
          @input="onInput(i)"
          @keydown.backspace.prevent="onBackspace(i)"
        />
      </div>
    </div>

    <template #footer>
      <BaseButton
        full
        custom-class="px-5 md:px-6 h-11 md:h-12 md:max-w-[220px] flex items-center justify-center gap-2"
        @click="onSubmit"
        :is-loading="isOtpLoading"
        :disabled="!isComplete || isOtpLoading"
        :aria-disabled="!isComplete || isOtpLoading"
      >
        <span class="font-medium">{{ $t('dialog.continue') }}</span>

        <i class="pi pi-arrow-right" />
      </BaseButton>
    </template>
  </Dialog>

  <main class="min-h-screen flex flex-col">
    <div class="flex-grow bg-gray-50 flex flex-col px-4 mt-8 items-center">
      <div class="flex flex-col items-center mb-10">
        <h1 class="text-2xl font-bold text-text-color mb-3 md:text-3xl">
          {{ $t('refund.title') }}
        </h1>
        <p
          class="text-sm text-text-color leading-relaxed font-normal max-w-xs text-center md:max-w-full"
        >
          {{ $t('refund.subtitle') }}
        </p>
      </div>

      <div class="w-full max-w-sm bg-white rounded-lg shadow-lg overflow-hidden md:max-w-md">
        <div class="px-6 py-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-semibold text-text-color mb-2">
                {{ $t('refund.emai_label') }}
              </label>

              <input
                id="email"
                v-model="email"
                type="email"
                placeholder=""
                class="w-full h-12 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-offset-primary-color-medium focus:border-primary-color-medium transition-colors duration-200 focus:outline-none text-sm text-text-color"
                required
              />

              <p
                v-if="formError"
                id="email-error"
                class="mt-1 text-xs text-red-600"
                aria-live="polite"
              >
                {{ formError }}
              </p>
            </div>

            <BaseButton type="submit" aria-disabled="isLoading" full :is-loading="isLoading">
              <span className="font-normal text-base">
                {{ $t('refund.find_purchase') }}
              </span>
            </BaseButton>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import BaseButton from '@/components/BaseButton.vue'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted, nextTick } from 'vue'
import { useCountdown } from '@/composables/useCountdown'
import { useToast } from 'primevue/usetoast'

const toast = useToast()
const router = useRouter()
const { value: countdown, start: startTimer } = useCountdown(40)
const formError = ref<string | null>(null)
const otp = ref<string[]>(['', '', '', '', '', ''])
const otpRefs = ref<HTMLInputElement[]>([] as unknown as HTMLInputElement[])
const visible = ref(false)
const email = ref('')
const isLoading = ref(false)
const isOtpLoading = ref(false)

const focusIndex = async (idx: number) => {
  await nextTick()
  otpRefs.value?.[idx]?.focus()
}

const validateEmail = (v: string) => {
  if (!v) return 'Informe seu e-mail.'

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'E-mail inválido.'

  return null
}

const onInput = (idx: number) => {
  const val = otp.value[idx].replace(/\D/g, '')

  otp.value[idx] = val.slice(-1)

  if (otp.value[idx] && idx < 5) focusIndex(idx + 1)
}

const onBackspace = (idx: number) => {
  if (otp.value[idx]) {
    otp.value[idx] = ''
  } else if (idx > 0) {
    focusIndex(idx - 1)
    otp.value[idx - 1] = ''
  }
}

const isComplete = computed(() => otp.value.every((d) => d !== ''))

const onSubmit = async () => {
  if (isOtpLoading.value) {
    toast.add({
      severity: 'info',
      summary: 'Aguarde',
      detail: 'Aguarde a verificação do código.',
      life: 3000,
    })

    return
  }

  if (!isComplete.value) {
    toast.add({
      severity: 'warn',
      summary: 'Atenção',
      detail: 'Por favor, preencha todos os campos do código.',
      life: 3000,
    })

    return
  }

  isOtpLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Verificando OTP:', otp.value.join(''))

    router.push({ name: 'PurchaseList', query: { email: email.value } })
  } catch (error) {
    console.error('Erro ao verificar OTP:', error)
    alert('Erro ao verificar OTP. Tente novamente.')
  } finally {
    isOtpLoading.value = false
  }
}

const handleResend = () => {
  if (countdown.value > 0) return

  startTimer()
}

onMounted(() => {
  startTimer()
  focusIndex(0)
})

const handleSubmit = async () => {
  formError.value = validateEmail(email.value)

  if (formError.value) return

  isLoading.value = true

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Procurando compra para o email:', email.value)

    visible.value = true
  } catch (error) {
    console.error('Erro ao procurar compra:', error)
    alert('Erro ao procurar compra. Tente novamente.')
  } finally {
    isLoading.value = false
  }
}
</script>
