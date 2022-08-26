<script setup lang="ts">
import { ref } from 'vue'
import Layout from '@/components/shared/layout/Layout.vue'
import Navigation from '@/components/shared/navigation/Navigation.vue'
import Input from '@/components/shared/form/Input.vue'
import Button from '@/components/shared/form/Button.vue'
import footerImg from '/vector.svg'
import { useLoginStore } from '@/stores/login'
import { useRouter } from 'vue-router'

const username = ref<string>('')
const password = ref<string>('')
const loginStore = useLoginStore()
const router = useRouter()

const login = () => {
  loginStore.login(username.value, password.value)
  router.push({ name: 'Dashboard'})
}
</script>

<template>
  <Layout :showFooter="true">
    <template #header>
      <Navigation></Navigation>
    </template>
    <template #content>
      <h1>Join our stock community!</h1>
      <p>Download free photos and videos powered by the best photographers.</p>
      <Input type="text" v-model="username" placeholder="Enter username here..." label="Username"></Input>
      <Input type="password" v-model="password" placeholder="Enter password here..." label="Password"></Input>
      <Button class="mt-40" @click="login">Log in</Button>
    </template>
    <template #footer>
      <img :src="footerImg" />
    </template>
  </Layout>
</template>

<style>
.content {
  text-align: center;
}
.content h1 {
  margin-top: 160px;
  font-size: 44px;
  line-height: 55px;
  letter-spacing: -2.2px;
}
.content p {
  font-size: 22px;
  line-height: 28px;
}
</style>
