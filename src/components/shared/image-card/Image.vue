<script setup lang="ts">
import { computed } from 'vue'
import { Image } from '@/types/common';
import Button from '@/components/shared/form/Button.vue';
import { useImageStore } from '@/stores/image';

type ImageCardType = 'galery' | 'album' | 'details'

// Emits
const emit = defineEmits<{
  (e: 'image-click', id: string): void
  (e: 'open-modal', id: string): void
}>()

// Props
interface Props {
  image: Image | null
  type?: ImageCardType
}

const props = withDefaults(defineProps<Props>(), {
  type: 'galery'
})

// Data properties
const imageStore = useImageStore()

// Computed
const buttonText = computed(() => props.type === 'galery' ? 'Add to album' : props.type === 'album' ? 'Remove' : '')
const width = computed(() => props.type === 'details' ? imageStore.getImageWidth + 100 : imageStore.getImageWidth)
const height = computed(() => props.type === 'details' ? imageStore.getImageHeight + 100 : imageStore.getImageHeight)

// Methods
const openModal = (id: string): void => emit('open-modal', id)
const openImage = (id: string): void => emit('image-click', id)
</script>
  
<template>
  <span>
    <img
      :src="image?.modified_img_url"
      :title="image?.author"
      :alt="image?.author"
      :width="width"
      :height="height"
      @click="image ? openImage(image.id) : false"
    />
    <Button
      v-if="props.type !== 'details'"
      variant="dark-2"
      :wide="true"
      @click="image ? openModal(image.id) : false"
    >
    {{ buttonText }}
    </Button>
  </span>
</template>
  
<style scoped>
span {
  position: relative;
}
img {
  width: 100%;
  cursor: pointer;
}
button {
  position: absolute;
  bottom: 5px;
  left: 0;
  visibility: hidden;
}
span:hover > button {
  visibility: visible;
}
</style>