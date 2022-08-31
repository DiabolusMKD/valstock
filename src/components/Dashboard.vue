<script setup lang="ts">
import Layout from '@/components/shared/layout/Layout.vue'
import Navigation from '@/components/shared/navigation/Navigation.vue'
import Button from '@/components/shared/form/Button.vue'
import Image from '@/components/shared/image-card/Image.vue'
import Modal from '@/components/shared/modal/Modal.vue'
import NotificationMessage from '@/components/shared/notification/NotificationMessage.vue'
import { onBeforeMount, ref, computed } from 'vue'
import imageHook from '@/hooks/image'
import notificationHook from '@/hooks/notification'
import { useRouter } from 'vue-router'

// Data properties
const { imageStore } = imageHook()
const {
  isShownNotification,
  notificationType,
  notificationMessage,
} = notificationHook()
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
            @image-button="openAlbumModal"
            @close-modal="closeAlbumModal"
          ></Image>
        </span>
      </div>
      <Button class="mt-40" @click="imageStore.loadImages()">Load More</Button>
      <Modal
        v-if="openModal"
        :id="selectedImageId"
        @close-modal="closeAlbumModal"
      ></Modal>
      <NotificationMessage
        v-if="isShownNotification"
        :type="notificationType"
      >
        {{ notificationMessage }}
      </NotificationMessage>
    </template>
  </Layout>
</template>

<style>
.dashboard-container {
  width: 80%;
  margin: 80px auto 0;
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-auto-flow: dense;
}
.item {
  margin-left: 15px;
  margin-bottom: 10px;
  position: relative;
  height: 500px;
}
.item img {
  display: block;
  max-width: 100%;
  height: 100%;
}
.dashboard-container > .item:nth-child(2n+1) {
  height: 400px;
}
.dashboard-container > .item:nth-child(2n+4) {
  margin-top: -50px;
}
.dashboard-container > .item:nth-child(4),
.dashboard-container > .item:nth-child(6) {
  margin-top: -100px;
}
</style>
