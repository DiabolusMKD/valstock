<script setup lang="ts">
import Button from '@/components/shared/form/Button.vue'
import List from '@/components/shared/navigation/List.vue'
import logo from '/site-logo.svg'
import imageHook from '@/hooks/image'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// Props
interface Props {
  dashboard?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  dashboard: false 
})

// Data properties
const { albums } = imageHook()
const router = useRouter()
const navigateTo = ref<string>(props.dashboard ? '/dashboard' : '/')
const showAlbumList = ref<boolean>(false)

// Computed properties
const showAlbumButton = computed<boolean>(() => !!props.dashboard && !!albums.value.length)

// Methods
const toggleAlbumList = () => showAlbumList.value = !showAlbumList.value
const goToAlbum = (id: string) => {
  showAlbumList.value = false
  router.push({ name: 'Album', params: { albumId: id } })
}
</script>

<template>
  <nav>
    <div class="navbar">
      <router-link :to="navigateTo">
        <img class="site-logo" :src="logo">
      </router-link>
      <span
        v-if="showAlbumButton"
        class="album-list"
      >
        <Button
          type="button"
          variant="dark-3"
          @click="toggleAlbumList"
          >
          My Albums
        </Button>
        <List
          v-if="showAlbumList"
          :items="albums"
          @list-click="goToAlbum"
        >
        </List>
      </span>
    </div>
  </nav>
</template>

<style>
.site-logo {
  margin: auto;
}
.album-list {
  position: absolute;
  right: 240px;
}
</style>
