<script setup lang="ts">
import Input from '@/components/shared/form/Input.vue'
import Button from '@/components/shared/form/Button.vue'
import checkmark from '/checkmark.svg'
import checkmarkSave from '/checkmark-save.svg'
import { getRandomInteger } from '@/util/getRandomInteger'
import { computed, ref } from 'vue'

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
const albums = ref([{ id: 1, name: 'Album 1', active: true}, { id: 2, name: 'Album 2', active: false }, { id: 3, name: 'Album 3', active: true}])

// Methods
const closeModal = (openModal: false) => emit('close-modal', false)
const changeActiveLabel = (activeAlbumLabel: AlbumAction) => albumAction.value = activeAlbumLabel
const toggleExistingAlbum = (id: number) => {
  albums.value.map(album => {
    if (album.id == id) album.active = !album.active
  })
}
const createAlbum = () => {
  albums.value.push({
    id: getRandomInteger(1, 1000),
    name: albumName.value,
    active: true,
  })
  albumName.value = ''
}
</script>
  
<template>
  <div class="modal">
    <div class="modal-header" :class="albumAction === 'new' ? 'new' : 'existing'">
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
            <img :src="checkmark" class="checkmark-icon" />
          </span> {{ album.name }}
          </li>
        </ul>
        <span v-else>No Albums Added</span>
      </div>
    </div>
    <div class="modal-footer">
      <Button variant="light" @click="closeModal">Cancel</Button>
      <Button variant="dark">Save</Button>
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
  position: absolute;
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