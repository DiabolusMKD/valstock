<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'dark' | 'dark-2' | 'light' | 'wide'

interface Props {
  variant?: ButtonVariant
  submit?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'dark',
  submit: false,
})

const type = computed(() => props.submit ? 'submit' : 'button')
const extraClasses = computed(() => ({
  'dark-btn': props.variant === 'dark',
  'dark2-btn': props.variant === 'dark-2',
  'light-btn': props.variant === 'light',
  'wide-btn': props.variant === 'wide',
}))
</script>

<template>
  <button :type="type" :class="extraClasses">
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
}
.dark-btn {
  border: 2px solid var(--black);
  background-color: var(--black);
  color: var(--white);
}
.dark-btn:hover {
  background-color: var(--white);
  color: var(--black);
  cursor: pointer;
}
</style>