<template>
  <MainHeader/>
  <main>
    <!-- <MainAside /> -->
    <RouterView />
  </main>
</template>

<script>
import MainHeader from '@/components/MainHeader.vue'
// import MainAside from '@/components/MainAside.vue'

import { RouterView } from 'vue-router'
export default {
  components: {
    MainHeader,
    // MainAside,
    RouterView
  }
}
</script>
