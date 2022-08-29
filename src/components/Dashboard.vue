<script setup lang="ts">
import Layout from '@/components/shared/layout/Layout.vue'
import Navigation from '@/components/shared/navigation/Navigation.vue'
import Button from '@/components/shared/form/Button.vue';
import Image from '@/components/shared/image-card/Image.vue'
import { onBeforeMount } from 'vue'
import { useImageStore } from '@/stores/image'
import { useRouter } from 'vue-router'

// Data properties
const imageStore = useImageStore()
const router = useRouter()

// Methods
const openDetails = (id: string) => router.push({ name: 'ImageDetails', params: { imageId: id } })

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
        <span class="item" v-for="image in imageStore.images" :key="image.id">
          <Image :image="image" @image-click="openDetails"></Image>
        </span>
      </div>
      <Button class="mt-40" @click="imageStore.loadImages()">Load More</Button>
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
