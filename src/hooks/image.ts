import { useImageStore } from '@/stores/image'
import { computed } from 'vue'

export default () => {
  const imageStore = useImageStore()
  const albums = computed(() => imageStore.getAlbums)

  return {
    imageStore,
    albums,
  }
}
