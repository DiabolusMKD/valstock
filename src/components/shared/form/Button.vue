<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'dark' | 'dark-2' | 'light'

interface Props {
  variant?: ButtonVariant
  wide?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dark',
  wide: false,
})

const extraClasses = computed(() => ({
  'dark-btn': props.variant === 'dark',
  'dark2-btn': props.variant === 'dark-2',
  'light-btn': props.variant === 'light',
  'wide-btn': props.wide === true,
}))
</script>

<template>
  <button type="button" :class="extraClasses">
    <slot></slot>
  </button>
</template>

<style>
button {
  padding: 6px 42px;
  font-size: 14px;
  line-height: 18px;
  font-weight: 800;
  text-transform: uppercase;
  cursor: pointer;
}
.dark-btn, .dark2-btn {
  border: 2px solid var(--black);
  background-color: var(--black);
  color: var(--white);
}
.dark-btn:hover {
  background-color: var(--white);
  color: var(--black);
}
.light-btn {
  border: 2px solid var(--black);
  background-color: var(--white);
  color: var(--black);
}
.light-btn:hover {
  background-color: var(--black);
  color: var(--white);
}
.wide-btn {
  width: 100%;
  padding: 22px;
}
</style>