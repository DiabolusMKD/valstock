<script setup lang="ts">
import Layout from '@/components/shared/layout/Layout.vue'
import Navigation from '@/components/shared/navigation/Navigation.vue'
import Button from '@/components/shared/form/Button.vue';
import Image from '@/components/shared/image-card/Image.vue'
import { onBeforeMount, computed, ref } from 'vue'
import { useImageStore } from '@/stores/image'
import { useRoute, useRouter } from 'vue-router';

// Data properties
const imageStore = useImageStore()
const route = useRoute()
const router = useRouter()
const date = ref(new Date())
const dateNow = date.value.toLocaleString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

// Computed properties
const image = computed(() => imageStore.selectedImage)

// Methods
const goBack = () => router.push({ name: 'Dashboard'})

// Lifecycle hook
onBeforeMount(async () => {
  await imageStore.fetchImage(route.params.imageId as any)
  imageStore.setInitialPage()
})
</script>
  
<template>
  <Layout>
    <template #header>
      <Navigation :dashboard="true"></Navigation>
    </template>
    <template #content>
      <div class="container">
        <div class="details-top-buttons">
          <Button variant="light">Add to album +</Button>
          <Button variant="dark-2">Download</Button>
        </div>
        <div class="details-image">
          <Image :image="image" type="details"></Image>
        </div>
        <div class="details">
          <div class="uploaded-by">
            Uploaded by
          </div>
          <div class="author">
            {{ image?.author }}
          </div>
          <div class="date">
            {{ dateNow }}
          </div>
        </div>
        <Button class="back-btn" variant="light" @click="goBack">Go back</Button>
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.container {
  margin-top: 130px;
}
.details-top-buttons > button:first-child {
  margin-right: 30px;
}
.details-image {
  width: 500px;
  margin: 60px auto 0;
}
.uploaded-by {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: bold;
  margin-top: 30px;
}
.author {
  font-size: 32px;
  margin-top: 5px;
}
.date {
  margin-top: 5px;
  color: var(--grey);
  font-size: 14px;
}
.back-btn {
  margin-top: 35px;
}
</style>
  