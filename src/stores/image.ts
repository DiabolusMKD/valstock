import { defineStore } from 'pinia'
import { Image, Album } from '@/types/common'

type ImageStoreState = {
  images: Image[]
  limit: number
  page: number
  isFetching: boolean
  error: null | string
  selectedImage: Image | null
  imageWidth: number
  imageHeight: number
  albums: Album[] | []
  api: Api
}

type Api = {
  url: string
  headers: Headers
  method: string
}

type Headers = {
  [key: string]: string
}

export const useImageStore = defineStore('image', {
  state: () =>
    ({
      images: [],
      limit: 10,
      page: 1,
      isFetching: false,
      error: null,
      selectedImage: null,
      imageWidth: 400,
      imageHeight: 500,
      albums: [],
      api: {
        url: 'https://picsum.photos',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
      }
    }) as ImageStoreState,
  getters: {
    getImageWidth: (state: ImageStoreState) => state.imageWidth,
    getImageHeight: (state: ImageStoreState) => state.imageHeight,
    getAlbums: (state: ImageStoreState) => state.albums,
  },
  actions: {
    async loadImages() {
      this.isFetching = true
      await fetch(`${this.api.url}/v2/list?page=${this.page}&limit=${this.limit}`, this.api.headers)
        .then((response) => {
          if(response.status >= 400 && response.status < 600) this.error = 'Server error occured while loading the images!'
          return response.json()
        })
        .then((returnedResponse) => {
          returnedResponse.map((image: Image) => {
            image.modified_img_url = modifyImageUrl(image, this.imageWidth, this.imageHeight)
            image.albums = []
          })
          this.images?.push(...returnedResponse)
          this.page++
        })
        .catch((error) => {
          console.error(error)
          this.error = error
        })
      this.isFetching = false
    },
    async fetchImage(id: string | null) {
      this.isFetching = true
      const image = id ? this.images.find(img => img.id === id) : null
      if(image != null) {
        this.selectedImage = image
      } else {
        await fetch(`${this.api.url}/id/${id}/info`, this.api.headers)
        .then((response) => {
          if(response.status >= 400 && response.status < 600) this.error = 'Server error occured while loading the image!'
          return response.json()
        })
        .then((returnedResponse) => {
          returnedResponse.modified_img_url = modifyImageUrl(returnedResponse, this.imageWidth, this.imageHeight)
          this.selectedImage = returnedResponse
        })
        .catch((error) => {
          console.error(error)
          this.error = error
        })
      }
      this.isFetching = false
    },
    setInitialPage() {
      this.page = 1
    },
    saveAlbum(id: string, albums: Album[]) {
      this.images.find(image => {
        if(image.id === id) {
          image.albums = albums.map(album => album.id)
        }
      })
    },
  }
})

const modifyImageUrl = (image: Image, imageWidth: number, imageHeight: number): string => {
  let modifiedImgUrl = image.download_url
  const width = '' + image.width
  const height = '' + image.height
  modifiedImgUrl = modifiedImgUrl.replace(width, `${imageWidth}`)
  modifiedImgUrl = modifiedImgUrl.replace(height, `${imageHeight}`)
  return modifiedImgUrl
}