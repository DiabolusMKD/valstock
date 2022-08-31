<script setup lang="ts">
import { computed } from 'vue'

type ButtonVariant = 'dark' | 'dark-2' | 'dark-3' | 'light' | 'red'

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
  'dark3-btn': props.variant === 'dark-3',
  'light-btn': props.variant === 'light',
  'red-btn': props.variant === 'red',
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
.dark3-btn {
  border: 2px solid var(--white);
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
.red-btn {
  border: 2px solid var(--red);
  background-color: var(--red);
  color: var(--white);
}
.wide-btn {
  width: 100%;
  padding: 22px;
}
</style>
