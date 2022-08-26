<script setup lang="ts">
import { ref } from 'vue'
import Layout from './shared/layout/Layout.vue'
import Navigation from './shared/navigation/Navigation.vue'
import Input from './shared/form/Input.vue'
import Button from './shared/form/Button.vue'
import footerImg from '/vector.svg'

const username = ref<string>('')
const password = ref<string>('')
</script>

<template>
  <Layout>
    <template #header>
      <Navigation></Navigation>
    </template>
    <template #content>
      <h1>Join our stock community!</h1>
      <p>Download free photos and videos powered by the best photographers.</p>
      <Input type="text" v-model="username" placeholder="Enter username here..." label="Username"></Input>
      <Input type="password" v-model="password" placeholder="Enter password here..." label="Password"></Input>
      <Button class="mt-40">Log in</Button>
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
