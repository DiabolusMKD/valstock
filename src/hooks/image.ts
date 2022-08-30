import { useImageStore } from '@/stores/image'

export default () => {
  const imageStore = useImageStore()
  return {
    imageStore,
  }
}