<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <Header />

  <div class="pt-32 md:pt-16">
    <RouterView />
  </div>

  <Footer />
</template>
