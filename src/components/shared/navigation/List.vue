<script setup lang="ts">
import { ref } from 'vue'

interface Item {
  id: string | number
  name: string
}

// Emits
const emit = defineEmits<{
  (e: 'list-click', id: string): void
}>()

// Props
interface Props {
  items: Item[]
}
const props = withDefaults(defineProps<Props>(), {
  items: undefined 
})

// Methods
const clickElement = (id: string): void => emit('list-click', id)
</script>

<template>
  <span class="list">
    <ul>
      <li
        v-for="item in items"
        :key="item.id"
        @click="clickElement('' + item.id)"
      >
        {{ item.name }}
      </li>
    </ul>
  </span>
</template>

<style scoped>
.list {
  background-color: var(--white);
  border: 2px solid var(--black);
  box-shadow: 0px 3px 6px #00000029;
  position: absolute;
  right: 0;
  top: 55px;
  text-align: center;
  width: 100%;
}
.list li {
  list-style: none;
  color: var(--grey);
  cursor: pointer;
  padding: 25px 20px 0px;
}
.list li:last-child {
  padding: 25px 20px;
}
.list li:hover {
  color: var(--black);
}
</style>
  