import { defineStore, Store } from 'pinia'

type NotificationState = {
  type: NotificationType,
  message: string
  showNotification: boolean
}

type NotificationType = 'success' | 'warning' | 'error'

export const useNotificationStore = defineStore('notification', {
  state: () =>
    ({
      type: 'success',
      message: '',
      showNotification: false
    }) as NotificationState,
  getters: {
    isShownNotification: (state) => state.showNotification,
    getNotificationMessage: (state) => state.message,
    getNotificationtype: (state) => state.type
  },
  actions: {
    notify(type: NotificationType, message: string) {
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
