<script setup lang="ts">
import { NotificationType } from '@/types/common'

// Props
interface Props {
  type?: NotificationType
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success'
})
</script>
  
<template>
  <span
    class="notification-message"
    :class="type === 'success' ? 'success' : type === 'warning' ? 'warning' : 'error'"
  >
    <slot></slot>  
  </span>
</template>
  
<style scoped>
.notification-message {
  height: 180px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  box-shadow: 0px -5px 8px #00000029;
  color: var(--white);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  font-weight: bold;
}

.success {
  background-color: var(--black);
}

.warning {
  background-color: orange;
}

.error {
  background-color: var(--red);
}
</style>
