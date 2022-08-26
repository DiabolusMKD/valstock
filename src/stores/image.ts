import { defineStore, Store } from 'pinia'

type ImageStoreState = {
  images: Image[]
  limit: number
  page: number
  isFetching: boolean
  error: null | string
  api: Api
}

type Image = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
  modified_img_url: string
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
      api: {
        url: 'https://picsum.photos/v2/list',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'GET',
      }
    }) as ImageStoreState,
  getters: {
  },
  actions: {
    async loadImages() {
      this.isFetching = true
      await fetch(`${this.api.url}?page=${this.page}&limit=${this.limit}`, this.api.headers)
        .then((response) => {
          if(response.status >= 400 && response.status < 600) this.error = 'Server error occured while loading the images!'
          return response.json()
        })
        .then((returnedResponse) => {
          returnedResponse.map((image: Image) => {
            let modifiedImgUrl = image.download_url
            const width = '' + image.width
            const height = '' + image.height
            modifiedImgUrl = modifiedImgUrl.replace(width, '400')
            modifiedImgUrl = modifiedImgUrl.replace(height, '500')
            image.modified_img_url = modifiedImgUrl
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
    setInitialPage() {
      this.page = 1
    }
  }
})