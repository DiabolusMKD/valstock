<script setup lang="ts">
import Layout from '@/components/shared/layout/Layout.vue'
import Navigation from '@/components/shared/navigation/Navigation.vue'
import Button from '@/components/shared/form/Button.vue'
import Image from '@/components/shared/image-card/Image.vue'
import NotificationMessage from '@/components/shared/notification/NotificationMessage.vue'
import { ref, computed } from 'vue'
import imageHook from '@/hooks/image'
import { useRoute, useRouter } from 'vue-router'
import notificationHook from '@/hooks/notification'
import { Image as ImageType } from '@/types/common'

// Data properties
const { imageStore } = imageHook()
const route = useRoute()
const router = useRouter()
const {
  isShownNotification,
  notificationType,
  notificationMessage,
  notificationStore,
} = notificationHook()

// Computed properties
const albumImages = computed<ImageType[] | []>(() => imageStore.getAlbumImages(+route.params.albumId)) || []
const album = computed(() => imageStore.getAlbumInfo(+route.params.albumId)) || {}
const dateCreated = computed(() => new Date(album.value?.created).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
)

// Methods
const removeImage = (id: string) => {
  if(id && route.params.albumId) {
    imageStore.removeImageFromAlbum(id, +route.params.albumId)
    notificationStore.notify('success', 'Successfully removed image from the album')
  } else {
    notificationStore.notify('error', 'Something went wrong')
  }
}
const goBack = () => router.push({ name: 'Dashboard'})
</script>

<template>
  <Layout>
    <template #header>
      <Navigation :dashboard="true"></Navigation>
    </template>
    <template #content>
      <div class="container mt-40">
        <div class="album-info">
          <h1 class="album-name">{{ album.name }}</h1>
          <p class="album-created">Date created: {{ dateCreated }}</p>
        </div>
        <div class="album-container" v-if="albumImages.length">
          <span class="item" v-for="image in albumImages" :key="image.id">
            <Image
              :image="image"
              type="album"
              @image-button="removeImage"
            ></Image>
          </span>
        </div>
        <div class="no-images" v-else><p>No Images</p></div>
        <Button
          class="back-btn"
          variant="light"
          @click="goBack"
        >
          Go back
        </Button>
      </div>
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
  .album-container {
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
  .no-images {
    display: flex;
    justify-content: center;
    margin-top: 80px;
  }
  .album-name {
    color: var(--black);
    font-size: 32px;
    line-height: 40px;
    letter-spacing: 0.64px;
  }
  .album-created {
    color: var(--grey);
    font-size: 14px;
    line-height: 18px;
  }
  .back-btn {
    margin-top: 70px;
  }
</style>
  