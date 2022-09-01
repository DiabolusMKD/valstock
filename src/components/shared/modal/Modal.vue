<script setup lang="ts">
import Input from '@/components/shared/form/Input.vue'
import Button from '@/components/shared/form/Button.vue'
import checkmark from '/checkmark.svg'
import checkmarkSave from '/checkmark-save.svg'
import { getRandomInteger } from '@/util/getRandomInteger'
import { computed, ref } from 'vue'
import { Album } from '@/types/common'
import notificationHook from '@/hooks/notification'
import imageHook from '@/hooks/image';

type AlbumAction = 'new' | 'existing'

// Emits
const emit = defineEmits<{
  (e: 'close-modal', openModal: boolean): void
}>()

// Props
interface Props {
  id: string | null
}

const props = withDefaults(defineProps<Props>(), {
  id: null,
})

// Data properties
const albumAction = ref<AlbumAction>('new')
const albumName = ref<string>('')
const { imageStore } = imageHook()
const { notificationStore } = notificationHook()
const albums = computed<Album[]>(() => imageStore.getAlbums)
const activeImage = computed(() => imageStore.$state.images.find(image => image.id == props.id))

albums.value.map(album => album.active = activeImage.value?.albums.includes(album.id) as boolean)

// Methods
const closeModal = () => emit('close-modal', false)
const changeActiveLabel = (activeAlbumLabel: AlbumAction) => albumAction.value = activeAlbumLabel
const toggleExistingAlbum = (id: number) => {
  albums.value.map(album => {
    if (album.id == id) album.active = !album.active
  })
}
const createAlbum = () => {
  const newAlbum: Album = {
    id: getRandomInteger(1, 1000),
    name: albumName.value,
    active: true,
    created: new Date()
  } 
  albums.value.push(newAlbum)
  albumName.value = ''
}
const save = () => {
  if(props.id) {
    imageStore.saveAlbum(props.id, albums.value.filter(album => album.active == true))
    notificationStore.notify('success', 'Successfully added image to the selected album(s)')
  } else {
    notificationStore.notify('error', 'Something went wrong')
  }
  closeModal()
}
</script>
  
<template>
  <div class="modal">
    <div class="modal-header" :class="(albumAction === 'new' || albums.length <= 1) ? 'new' : 'existing'">
      <span
        @click="changeActiveLabel('new')"
        :class="albumAction === 'new' ? 'active' : ''"
      >
        Create new album
      </span>
      <span
        @click="changeActiveLabel('existing')"
        :class="albumAction === 'existing' ? 'active' : ''"
      >
        Add to existing
      </span>
    </div>
    <div class="modal-body">
      <div v-if="albumAction === 'new'" class="new-album">
        <Input v-model="albumName" placeholder="Enter title here"></Input>
        <img
          v-if="albumName.length"
          :src="checkmarkSave"
          class="checkmark-save"
          alt="checkmark_save_icon"
          title="Save"
          @click="createAlbum"
        />
      </div>
      <div v-else class="existing-albums">
        <ul v-if="albums.length" class="albums">
          <li
            v-for="album in albums"
            :key="album.id"
            :class="album.active ? 'active' : ''"
            @click="toggleExistingAlbum(album.id)"
          >
          <span v-if="album.active">
            <img
              :src="checkmark"
              class="checkmark-icon"
              alt="active_icon"
              title="Active Album"
            />
          </span> {{ album.name }}
          </li>
        </ul>
        <span v-else>No Albums Added</span>
      </div>
    </div>
    <div class="modal-footer">
      <Button variant="light" @click="closeModal">Cancel</Button>
      <Button variant="dark" @click="save">Save</Button>
    </div>
  </div>
</template>
  
<style scoped>
.modal {
  width: 542px;
  height: 463px;
  border: 4px solid var(--black);
  background: var(--white) 0% 0% no-repeat padding-box;
  box-shadow: 0px 5px 20px #00000029;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.modal-header.new {
  margin-top: 145px;
}
.modal-header.existing {
  margin-top: 95px;
}
.modal-header > span {
  font-size: 14px;
  text-transform: uppercase;
  line-height: 18px;
  color: var(--grey);
  font-weight: bold;
  cursor: pointer;
}
.modal-header > span:first-child {
  margin-right: 30px;
}
.modal-header > span.active {
  color: var(--black);
}
.modal-body {
  margin-top: 30px;
}
.modal-body .albums {
  height: 125px;
  overflow-y: scroll;
}
.modal-body li {
  list-style: none;
  margin-bottom: 25px;
  color: var(--grey);
  cursor: pointer;
}
.modal-body li.active {
  color: var(--black);
}
.modal-body li:hover {
  color: var(--black);
}
.modal-body > .new-album > img.checkmark-save,
.modal-body > .existing-albums > .albums img.checkmark-icon {
  cursor: pointer;
  height: auto;
}
.modal-body > .existing-albums > .albums > li {
  font-size: 14px;
  font-weight: normal;
}
.modal-footer {
  margin-top: 65px;
  margin-bottom: 78px;
}
.modal-footer > button:first-child {
  margin-right: 16px;
}
</style>

<style>
.modal > .modal-body > .new-album > .input > input {
  font-size: 32px;
  border: none;
  outline: none;
  color: var(--black);
  width: 240px;
}
</style>
