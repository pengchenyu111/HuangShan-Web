<template>
  <div>
    <notification-list/>
  </div>
</template>

<script>
import NotificationList from './notification_module/NotificationList'
export default {
  name: 'NotificationModule',
  components: {
    'notification-list': NotificationList
  }
}
</script>

<style scoped>

</style>
