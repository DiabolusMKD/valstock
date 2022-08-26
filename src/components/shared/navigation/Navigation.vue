<script setup lang="ts">
import logo from '/site-logo.svg'
import { ref } from 'vue'

interface Props {
  dashboard?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  dashboard: false 
})

const navigateTo = ref<string>(props.dashboard ? '/dashboard' : '/')

</script>

<template>
  <nav>
    <div class="navbar">
      <router-link :to="navigateTo">
        <img class="site-logo" :src="logo">
      </router-link>
      <slot name="album-navbar" />
    </div>
  </nav>
</template>

<style>
.site-logo {
  margin: auto;
}
</style>
