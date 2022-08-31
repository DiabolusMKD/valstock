import { defineStore } from 'pinia'
import { NotificationType } from '@/types/common'

type NotificationState = {
  type: NotificationType,
  message: string
  showNotification: boolean
}

export const useNotificationStore = defineStore('notification', {
  state: () =>
    ({
      type: 'success',
      message: '',
      showNotification: false
    }) as NotificationState,
  getters: {
    isShownNotification: (state: NotificationState) => state.showNotification,
    getNotificationMessage: (state: NotificationState) => state.message,
    getNotificationtype: (state: NotificationState) => state.type
  },
  actions: {
    notify(this: NotificationState, type: NotificationType, message: string) {
      this.showNotification = true
      this.type = type
      this.message = message
      setTimeout(() => {
        this.showNotification = false
        this.message = ''
      }, 3000)
    }
  },
})
