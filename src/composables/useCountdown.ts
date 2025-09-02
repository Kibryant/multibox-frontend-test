import { ref, onUnmounted } from 'vue'

export function useCountdown(initial = 40) {
  const value = ref(initial)

  let timer: number | undefined

  function start() {
    stop()
    value.value = initial
    timer = window.setInterval(() => {
      value.value--
      if (value.value <= 0) stop()
    }, 1000)
  }

  function stop() {
    if (timer) {
      clearInterval(timer)
      timer = undefined
    }
  }

  onUnmounted(stop)

  return { value, start, stop, isRunning: () => !!timer }
}
