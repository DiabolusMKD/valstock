<script setup lang="ts">
import Layout from '@/components/shared/layout/Layout.vue'
import Navigation from '@/components/shared/navigation/Navigation.vue'
import Button from '@/components/shared/form/Button.vue';
import Image from '@/components/shared/image-card/Image.vue'
import Modal from '@/components/shared/modal/Modal.vue'
import { onBeforeMount, ref, computed } from 'vue'
import { useImageStore } from '@/stores/image'
import { useRouter } from 'vue-router'

// Data properties
const imageStore = useImageStore()
const router = useRouter()
const openModal = ref<boolean>(false)
const selectedImageId = ref<string>('')

// Computed properties
const images = computed(() => imageStore.images)

// Methods
const openDetails = (id: string) => router.push({ name: 'ImageDetails', params: { imageId: id } })
const openAlbumModal = (id: string) => {
  openModal.value = true
  selectedImageId.value = id
}
const closeAlbumModal = () => {
  openModal.value = false
  selectedImageId.value = ''
}

// Lifecycle hooks
onBeforeMount(async () => {
  imageStore.setInitialPage()
  await imageStore.loadImages()
})
</script>

<template>
  <Layout>
    <template #header>
      <Navigation :dashboard="true"></Navigation>
    </template>
    <template #content>
      <div class="dashboard-container mt-40">
        <span class="item" v-for="image in images" :key="image.id">
          <Image
            :image="image"
            @image-click="openDetails"
            @open-modal="openAlbumModal"
            @close-modal="closeAlbumModal"
            class="galery-image"
          ></Image>
        </span>
      </div>
      <Button class="mt-40" @click="imageStore.loadImages()">Load More</Button>
      <Modal
        v-if="openModal"
        :id="selectedImageId"
        @close-modal="closeAlbumModal"
      ></Modal>
    </template>
  </Layout>
</template>

<style>
.dashboard-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: 10px;
  width: 80%;
  margin: 80px auto 40px;
}
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3em;
  font-weight: bold;
  color: white;
  margin: 10px;
}
.item:nth-child(2n+5):nth-child(2n+2) img {
  margin-top: -300px;
}
.item:nth-child(2n+2) img {
  height: 400px;
}
</style>
