import { useNotificationStore } from '@/stores/notification'
import { computed } from 'vue'

export default () => {
  const notificationStore = useNotificationStore()
  const isShownNotification = computed(() => notificationStore.isShownNotification)
  const notificationMessage = computed(() => notificationStore.getNotificationMessage)
  const notificationType = computed(() => notificationStore.getNotificationtype)
  return {
    notificationStore,
    isShownNotification,
    notificationMessage,
    notificationType,
  }
}