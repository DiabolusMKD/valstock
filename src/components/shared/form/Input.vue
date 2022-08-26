<script setup lang="ts">
import { computed } from 'vue'

type InputType = 'text' | 'password' | 'email'

interface Props {
  name?: string
  label?: string
  error?: string
  modelValue: string
  placeholder?: string
  type?: InputType
}

const props = withDefaults(defineProps<Props>(), {
  name: undefined,
  label: undefined,
  error: undefined,
  placeholder: '',
  type: 'text'
})

const value = computed<string | undefined>({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="input">
    <label v-if="label">{{ label }}</label>
    <input :type="type" :placeholder="placeholder" :name="name" v-model="value" />
  </div>
</template>

<style scoped>
.input label {
  display: block;
  font-size: 14px;
  line-height: 18px;
  text-transform: uppercase;
  font-weight: 800;
  margin-top: 40px;
}
.input input {
  border: 2px solid var(--black);
  width: 327px;
  height: 48px;
  font-size: 16px;
  line-height: 20px;
  color: var(--grey);
  letter-spacing: 0.32px;
  padding-left: 16px;
}
</style>