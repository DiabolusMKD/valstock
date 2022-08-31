export type Image = {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
  modified_img_url: string
  albums: number[] | []
}

export type Album = {
  id: number
  name: string
  active: boolean
}

export type NotificationType = 'success' | 'warning' | 'error'
